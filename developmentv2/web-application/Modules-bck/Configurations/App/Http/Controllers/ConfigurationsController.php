<?php

namespace Modules\Configurations\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ConfigurationsController extends Controller
{

    public function onLoadInformationSharingConfig(Request $req)
    {
        try {
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);

            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $check_exempt = DB::table('tra_exemptedpublic_tables')
                ->where(array('table_name' => $table_name))
                ->count();
            $sql = DB::table($table_name . ' as t1');

            if ($check_exempt > 0 || $table_name == null || $table_name == '') {
                $res = array('success' => false, 'message' => 'Table has been blocked for access');
                return response()->json($res);
            }
            if (!empty($requestData)) {
                $sql->where($requestData);
            }
            $sql->orderBy('t1.name', 'asc'); 
            $data = $sql->get();

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onsaveConfigData(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();
            $resetcolumns = $req->resetcolumns;

            $table_name = $req->table_name;
            $record_id = $req->id;
            unset($data['user_id']);
            unset($data['user_name']);
            unset($data['table_name']);
            unset($data['resetcolumns']);
            if ($resetcolumns != '') {
                $restcolumn_array = explode(',', $resetcolumns);
                $data = unsetArrayData($data, $restcolumn_array);
            }
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                unset($data['id']);
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }

            $res = getGenericResponsewithRercId($resp);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function onLoadConfigurationData(Request $req)
    {
        try {
            $requestData =$req->all();
            $filter = $req->filter;
            //Decryption 
            $table_name_data=decrypt_data($req->table_name);
            $table_name = base64_decode($table_name_data);
            // $table_name = base64_decode($req->table_name);

            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $check_exempt = DB::table('tra_exemptedpublic_tables')
                ->where(array('table_name' => $table_name))
                ->count();
            $sql = DB::table($table_name . ' as t1');

            if ($check_exempt > 0 || $table_name == null || $table_name == '') {
                $res = array('success' => false, 'message' => 'Table has been blocked for access');
                return response()->json($res);
            }
            if (!empty($requestData)) {
                $sql->where($requestData);
            }
            $sql->orderBy('t1.name', 'asc'); 
            $data = $sql->get();
            // Encryption
            $data=encrypt_data($data);

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onEnableConfigurationsDetails(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = $req->table_name;
            $title = $req->title;
            $user_id = $req->user_id;
            $data = array();
           
            $user_name = $req->user_name;
            //get the records 
            $resp = false;
            if (validateIsNumeric($req->id)) {
                $record_id = $req->id;
            }

            $where_state = array('id' => $record_id);

            $record = DB::table($table_name)
                ->where($where_state)
                ->first();
            if ($record) {
                $is_enabled = $record->is_enabled;
                if($is_enabled){
                    $is_enabled = false;
                    $enabling_string = "Disabled Successfully";
                }
                else{
                    $is_enabled = true;
                    $enabling_string = "Enabled Successfully";
                }
                $data = array('is_enabled'=>$is_enabled);

                $previous_data = getPreviousRecords($table_name, $where_state);

                $data['dola'] = Carbon::now();
                $data['altered_by'] = $user_id;

                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = updateRecord($table_name, $previous_data['results'], $where_state, $data, $user_name);
            }

            if ($resp) {
                $res = array('success' => true, 'message' => $title . $enabling_string);
            } else {
                $res = array('success' => false, 'message' => $title .' '. $enabling_string.' , contact the system admin if this persists');
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }

    public function onLoadTranslationManagement(Request $req)
{
    try {
        $translation_data = array();
        $table_name = $req->table_name;
        $table_name = base64_decode($table_name);
        $system_language_id = $req->system_language_id;

        $records = DB::table('par_system_labels as t1')
            ->join('par_system_languages as t2', 't1.system_language_id', 't2.id')
            ->select('t1.id', 't1.name', 't1.description', 't2.name as default_language', 't1.translation as default_translation', 't2.id as system_language_id')
            ->get();

        $language_records = DB::table('par_system_languages')->get();

        $translation_records = DB::table('tra_translation_management')->get();

        $translation_map = [];
        foreach ($translation_records as $translation) {
            $translation_map[$translation->system_label_id][$translation->system_language_id] = $translation;
        }

        foreach ($records as $rec) {
            $system_label_id = $rec->id;
            $system_label = $rec->name;

            foreach ($language_records as $language) {
                $language_id = $language->id;
                $translation_record = isset($translation_map[$system_label_id][$language_id]) ? $translation_map[$system_label_id][$language_id] : null;

                if ($translation_record) {
                    $translation_data[] = array(
                        'system_label_id' => $rec->id,
                        'system_label' => $system_label,
                        'id' => $rec->id,
                        'default_language' => $rec->default_language,
                        'translation_id' => $translation_record->id,
                        'description' => $rec->description,
                        'system_language_id' => $language_id,
                        'default_translation' => $rec->default_translation,
                        'language' => $language->name,
                        'translation' => $translation_record->translation
                    );
                } else {
                    $translation_data[] = array(
                        'system_label_id' => $rec->id,
                        'id' => $rec->id,
                        'system_label' => $rec->name,
                        'default_language' => $rec->default_language,
                        'description' => $rec->description,
                        'system_language_id' => $language_id,
                        'default_translation' => $rec->default_translation,
                        'language' => $language->name
                    );
                }
            }
        }
        $res = array('success' => true, 'data' => $translation_data);
    } catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    }

    return response()->json($res, 200);
}
 public function onDeleteConfigData(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = $req->table_name;
            $title = $req->title;
            $user_id = $req->user_id;
            $data = array();
            //get the records 
            $resp = false;
            if (validateIsNumeric($req->id)) {
                $record_id = $req->id;
            }

            $where_state = array('id' => $record_id);

            $records = DB::table($table_name)
                ->where($where_state)
                ->get();
            if (count($records) > 0) {
                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = deleteRecordNoTransaction($table_name, $previous_data['results'], $where_state, $user_id);
            }

            if ($resp) {
                $res = array('success' => true, 'message' => $title . ' deleted successfully');
            } else {
                $res = array('success' => false, 'message' => $title . ' delete failed, contact the system admin if this persists');
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }
    public function onSavingLanguageTranslationManagement(Request $req)
    {
        try {

            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = 'tra_translation_management';
            $permission_data = $req->permission_data;
            $record_id = $req->id;

            $permission_data = json_decode($permission_data);
            if (is_array($permission_data)) {
                //"system_label_id":1,"system_language_id":2,"translation":"Besoin daide ou de clarification"
                foreach ($permission_data as $rec) {

                    $system_label_id = $rec->system_label_id;
                    $system_language_id = $rec->system_language_id;
                    $translation = $rec->translation;
                    $where = array('system_label_id' => $system_label_id, 'system_language_id' => $system_language_id);

                    $records = DB::table($table_name)->where($where)->get();
                    $data = array(
                        'system_label_id' => $system_label_id,
                        'system_language_id' => $system_language_id,
                        'translation' => $translation
                    );
                    if (validateIsNumeric($system_label_id) && validateIsNumeric($system_language_id)) {
                        if (count($records) > 0) {
                            $data['dola'] = Carbon::now();
                            $data['altered_by'] = $user_id;

                            $previous_data = getPreviousRecords($table_name, $where);

                            $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                        } else {

                            $data['created_by'] = $user_id;
                            $data['created_on'] = Carbon::now();
                            $resp = insertRecord($table_name, $data, $user_name);
                        }
                    }
                }
            }
            $res = getGenericResponsewithRercId($resp);


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);

    }
}
