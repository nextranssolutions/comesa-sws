<?php

namespace Modules\SysAdministration\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class SysAdministrationController extends Controller
{
    public function GetDetails()
    {
        try {
            $usr_users_groups = DB::table('usr_users_groups')->get();
            $usr_users_accesslvls = DB::table('usr_users_accesslvls')->get();
            $tra_group_navigationassignment = DB::table('tra_group_navigationassignment')->get();

            $res = array(
                'success' => true,
                'message' => 'Fetched User groups, access levels and navigation assignments',
                'usr_users_groups' => $usr_users_groups,
                'usr_users_accesslvls' => $usr_users_accesslvls,
                'tra_group_navigationassignment' => $tra_group_navigationassignment,
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function GetSingleDetail($id)
    {
        try {
            $usr_users_groups = DB::table('usr_users_groups')->find($id);
            $usr_users_accesslvls = DB::table('usr_users_accesslvls')->find($id);
            $tra_group_navigationassignment = DB::table('tra_group_navigationassignment')->find($id);

            $res = array(
                'success' => true,
                'message' => 'Fetched User groups, access levels and navigation assignments',
                'usr_users_groups' => $usr_users_groups,
                'usr_users_accesslvls' => $usr_users_accesslvls,
                'tra_group_navigationassignment' => $tra_group_navigationassignment,
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onSaveSystemAdministrationDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();
           
            $table_name = $req->table_name;
            $resetcolumns = $req->resetcolumns;
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

            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function onSaveSystemAdministrationUserDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();
           
            $table_name = $req->table_name;
            $resetcolumns = $req->resetcolumns;
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
                $data['user_id'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }

            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onSaveRegulatoryFunctionGuidelines(Request $req)
    {
        try {
            // Gather inputs from the request
            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'sys_regulatoryfunction_guidelines';
    
            // Prepare data for insert/update
            $data = array(
                'name' => $req->name,
                'guideline_descriptions' => $req->guideline_descriptions,
                'links' => $req->links,
                'regulatory_function_id' => $req->regulatory_function_id,
                'is_enabled' => $req->boolean('is_enabled')
            );
    
            // Handle file upload if present
            if ($req->hasFile('document_path')) {
                $file = $req->file('document_path');
                $extension = $file->getClientOriginalExtension();   
                $upload_directory = 'views/dev_portal/comesa-sws/src/assets/dist/docs';
                $savedName = 'assets/dist/docs/doc-' . rand(0, 10000) . '.' . $extension;
    
                if ($file->move($upload_directory, $savedName)) {
                    // Save the file path to the data array
                    $data['document_path'] = $savedName;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }
    
            // Update if record ID is provided
            if (validateIsNumeric($record_id)) {
                $where = ['id' => $record_id];
    
                // Update if record exists
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
    
                    // Perform the update
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                // Insert a new record if no ID is provided
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }
    
            // Handle response based on success or failure of the operation
            if ($resp['success']) {
                $res = [
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                ];
            } else {
                $res = [
                    'success' => false,
                    'message' => $resp['message']
                ];
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
    
        return response()->json($res, 200);
        }

    public function onEnablePermitTypeDetails(Request $req)
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
                if ($is_enabled) {
                    $is_enabled = false;
                    $enabling_string = "Disabled Successfully";
                } else {
                    $is_enabled = true;
                    $enabling_string = "Enabled Successfully";
                }
                $data = array('is_enabled' => $is_enabled);

                $previous_data = getPreviousRecords($table_name, $where_state);

                $data['dola'] = Carbon::now();
                $data['altered_by'] = $user_id;

                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = updateRecord($table_name, $previous_data['results'], $where_state, $data, $user_name);
            }

            if ($resp) {
                $res = array('success' => true, 'message' => $title . $enabling_string);
            } else {
                $res = array('success' => false, 'message' => $title . ' ' . $enabling_string . ' , contact the system admin if this persists');
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }


    public function onSaveNotSlidesInformation(Request $req)
    {
        try {
            // Gather inputs from the request
            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'not_slides_informations';

            // Prepare data for insert/update
            $data = array(
                'name' => $req->name,
                'title' => $req->title,
                'slide_content' => $req->slide_content,
                'footer' => $req->footer,
                'is_enabled' => $req->boolean('is_enabled')
            );

            // Handle file upload if present
            if ($req->hasFile('image_path')) {
                $file = $req->file('image_path');
                $extension = $file->getClientOriginalExtension();
                // $upload_directory = '/opt/lampp/htdocs/nextrans-solutions/auda-ecred/developmentv2/public/views/dev_portal/auda-ecredsolution/src/assets/dist/img/';
                $upload_directory = config('images.upload_directory');
                $savedName = 'assets/dist/img/image-' . rand(0, 10000) . '.' . $extension;

                if ($file->move($upload_directory, $savedName)) {
                    // Save the file path to the data array
                    $data['image_path'] = $savedName;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }

            // Update if record ID is provided
            if (validateIsNumeric($record_id)) {
                $where = ['id' => $record_id];

                // Update if record exists
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);

                    // Perform the update
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                // Insert a new record if no ID is provided
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }

            // Handle response based on success or failure of the operation
            if ($resp['success']) {
                $res = [
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                ];
            } else {
                $res = [
                    'success' => false,
                    'message' => $resp['message']
                ];
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onSaveSignatories(Request $req)
    {
        try {
            // Gather inputs from the request
            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'wf_process_signatorydetails';

            // Prepare data for insert/update
            $data = array(
                'process_id' => $req->process_id,
                'name' => $req->name,
                'signatory_title' => $req->signatory_title,
                'active_from' => formatDate($req->active_from),
                'active_to' => formatDate($req->active_to),
                'user_id' => $req->user_id,
                // 'is_enabled' => $req->boolean('is_enabled')
            );

            // Handle file upload if present
            if ($req->hasFile('image_path')) {
                $file = $req->file('image_path');
                $extension = $file->getClientOriginalExtension();
                //$upload_directory = '/opt/lampp/htdocs/nextrans-solutions/auda-ecred/developmentv2/public/views/dev_portal/auda-ecredsolution/src/assets/dist/img/';
                $upload_directory = config('images.upload_directory');
                $savedName = 'assets/dist/img/image-' . rand(0, 10000) . '.' . $extension;

                if ($file->move($upload_directory, $savedName)) {
                    // Save the file path to the data array
                    $data['image_path'] = $savedName;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }

            // Update if record ID is provided
            if (validateIsNumeric($record_id)) {
                $where = ['id' => $record_id];

                // Update if record exists
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);

                    // Perform the update
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                // Insert a new record if no ID is provided
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }

            // Handle response based on success or failure of the operation
            if ($resp['success']) {
                $res = [
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                ];
            } else {
                $res = [
                    'success' => false,
                    'message' => $resp['message']
                ];
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }



    public function onSaveSystemAdminWithImage(Request $req)
    {
        try {
            // Gather inputs from the request
            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'sys_system_information';

            // Prepare data for insert/update
            $data = array(
                'system_name' => $req->system_name,
                'system_acronym' => $req->system_acronym,
                'organisation_name' => $req->organisation_name,
                'physical_address' => $req->physical_address,
                'country' => $req->country,
                'email_address' => $req->email_address,
                'image_path' => $req->image_path,

                // 'user_id' => $req->user_id,
                // 'is_enabled' => $req->boolean('is_enabled')
            );

            // Handle file upload if present
            if ($req->hasFile('image_path')) {
                $file = $req->file('image_path');
                $extension = $file->getClientOriginalExtension();
                //$upload_directory = '/opt/lampp/htdocs/nextrans-solutions/auda-ecred/developmentv2/public/views/dev_portal/auda-ecredsolution/src/assets/dist/img/';
                $upload_directory = config('images.upload_directory');
                $savedName = 'assets/dist/img/image-' . rand(0, 10000) . '.' . $extension;

                if ($file->move($upload_directory, $savedName)) {
                    // Save the file path to the data array
                    $data['image_path'] = $savedName;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }

            // Update if record ID is provided
            if (validateIsNumeric($record_id)) {
                $where = ['id' => $record_id];

                // Update if record exists
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);

                    // Perform the update
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                // Insert a new record if no ID is provided
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }

            // Handle response based on success or failure of the operation
            if ($resp['success']) {
                $res = [
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                ];
            } else {
                $res = [
                    'success' => false,
                    'message' => $resp['message']
                ];
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }


    public function onLoadTransactionPermitTypeData(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_transactionpermit_types';
            $permit_type_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('par_operation_type as t2', 't1.operation_type_id', 't2.id')
                ->leftJoin('par_product_categories as t3', 't1.product_category_id', 't3.id')
                ->leftJoin('tra_organisation_information as t4', 't1.organisation_id', 't4.id')
                ->leftJoin('wf_processes as t5', 't1.process_id', 't5.id')
                ->leftJoin('wf_workflows as t6', 't1.workflow_id', 't6.id')
                ->leftJoin('par_service_type as t7', 't1.service_type_id', 't7.id')
                ->leftJoin('par_refnumbers_formats as t8', 't1.reference_noformat_id', 't8.id')
                ->leftJoin('par_permit_statuses as t9', 't1.permit_status_id', 't9.id')
                ->leftJoin('par_renewable_statuses as t10', 't1.renewable_status_id', 't10.id')
                
                ->select(
                    't1.*',
                    't2.name as operation_type',
                    't3.name as product_category',
                    't4.name as organisation',
                    't5.name as process',
                    't6.name as workflow',
                    't7.name as service_type',
                    't8.name as ref_number_format',
                    't9.name as permit_status',
                    't10.name as renewable_status'

                );

            $data = $sql->get();
            foreach ($data as $rec) {
                $permit_type_data[] = array(
                    'id' => $rec->id,
                    'name' => $rec->name,
                    'description' => $rec->description,
                    'is_enabled' => $rec->is_enabled,
                    'operation_type_id' => $rec->operation_type_id,
                    'product_category_id' => $rec->product_category_id,
                    'organisation_id' => $rec->organisation_id,
                    'process_id' => $rec->process_id,
                    'workflow_id' => $rec->workflow_id,
                    'service_type_id' => $rec->service_type_id,
                    'reference_noformat_id' => $rec->reference_noformat_id,
                    'permit_status_id' => $rec->permit_status_id,
                    'renewable_status_id' => $rec->renewable_status_id,
                    'operation_type' => $rec->operation_type,
                    'product_category' => $rec->product_category,
                    'organisation' => $rec->organisation,
                    'process' => $rec->process,
                    'workflow' => $rec->workflow,
                    'service_type' => $rec->service_type,
                    'ref_number_format' => $rec->ref_number_format,
                    'permit_status' => $rec->permit_status,
                    'renewable_status' => $rec->renewable_status,
                    
                );
            }
            $res = ['success' => true, 'data' => $permit_type_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    
    public function onLoadTransactionProductRegistryDetails(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_hscodesproducts_registry';
            $permit_type_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('par_hscodechapters_defination as t2', 't1.chapters_defination_id', 't2.id')
                ->leftJoin('par_hscodesheading_definations as t3', 't1.heading_definations_id', 't3.id')
                ->leftJoin('par_hscodessubheading_defination as t4', 't1.subheading_definations_id', 't4.id')
                

                ->select(
                    't1.*',
                    't2.name as chapters_defination',
                    't3.name as heading_definations',
                    't4.name as subheading_definations',
                    

                );

            $data = $sql->get();
            foreach ($data as $rec) {
                $permit_type_data[] = array(
                    'id' => $rec->id,
                    'name' => $rec->name,
                    'description' => $rec->description,
                    'is_enabled' => $rec->is_enabled,
                    'chapters_defination_id' => $rec->chapters_defination_id,
                    'heading_definations_id' => $rec->heading_definations_id,
                    'subheading_definations_id' => $rec->subheading_definations_id,
                    'chapters_defination' => $rec->chapters_defination,
                    'heading_definations' => $rec->heading_definations,
                    'subheading_definations' => $rec->subheading_definations,

                );
            }
            $res = ['success' => true, 'data' => $permit_type_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    
    public function onLoadTransactionRestrictionProhibitions(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_restrictions_prohibitions';
            $permit_type_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('par_hscodechapters_defination as t2', 't1.chapters_defination_id', 't2.id')
                ->leftJoin('par_hscodesheading_definations as t3', 't1.heading_defination_id', 't3.id')
                ->leftJoin('par_hscodessubheading_defination as t4', 't1.subheading_defination_id', 't4.id')
                ->leftJoin('par_operation_type as t5', 't1.permit_operations_id', 't5.id')
                

                ->select(
                    't1.*',
                    't2.name as chapters_defination',
                    't3.name as heading_defination',
                    't4.name as subheading_defination',
                    't5.name as permit_operations',
                    

                );

            $data = $sql->get();
            foreach ($data as $rec) {
                $permit_type_data[] = array(
                    'id' => $rec->id,
                    'name' => $rec->name,
                    'description' => $rec->description,
                    'is_enabled' => $rec->is_enabled,
                    'code' => $rec->code,
                    'restrictions_accesslinks' => $rec->restrictions_accesslinks,
                    'chapters_defination_id' => $rec->chapters_defination_id,
                    'heading_defination_id' => $rec->heading_defination_id,
                    'subheading_defination_id' => $rec->subheading_defination_id,
                    'permit_operations_id' => $rec->permit_operations_id,
                    'chapters_defination' => $rec->chapters_defination,
                    'heading_defination' => $rec->heading_defination,
                    'subheading_defination' => $rec->subheading_defination,
                    'permit_operations' => $rec->permit_operations,

                );
            }
            $res = ['success' => true, 'data' => $permit_type_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onLoadTransactionEmailConfigurations(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_email_configurations';
            $email_config_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('par_emailssetup_types as t2', 't1.emailssetup_type_id', 't2.id')
                              

                ->select(
                    't1.*',
                    't2.name as email_setup_type',
                                      

                );

            $data = $sql->get();
            foreach ($data as $rec) {
                $email_config_data[] = array(
                    'id' => $rec->id,
                    'name' => $rec->name,
                    'description' => $rec->description,
                    'is_enabled' => $rec->is_enabled,
                    'code' => $rec->code,
                    'mail_mailer' => $rec->mail_mailer,
                    'mail_host' => $rec->mail_host,
                    'mail_port' => $rec->mail_port,
                    'mail_username' => $rec->mail_username,
                    'mail_password' => $rec->mail_password,
                    'mail_encryption' => $rec->mail_encryption,
                    'mail_from_address' => $rec->mail_from_address,
                    'mail_from_name' => $rec->mail_from_name,
                    'emailssetup_type_id' => $rec->emailssetup_type_id,
                    
                );
            }
            $res = ['success' => true, 'data' => $email_config_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onLoadNotificationScheduleConfigurations(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_notificationschedule_configurations';
            $email_config_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('ntf_notification_types as t2', 't1.notification_type_id', 't2.id')
                ->leftJoin('par_notifications_group as t3', 't1.notification_group_id', 't3.id')
                ->leftJoin('par_notificationschedule_types as t4', 't1.notificationschedule_type_id', 't4.id')            
               

                ->select(
                    't1.*',
                    't2.name as notification_type',
                    't3.name as notification_group',
                    't4.name as notification_schedule_type',
                    
                                      

                );

            $data = $sql->get();
            foreach ($data as $rec) {
                $email_config_data[] = array(
                    'id' => $rec->id,
                    'name' => $rec->name,
                    'description' => $rec->description,
                    'is_enabled' => $rec->is_enabled,
                    'code' => $rec->code,
                    'custom_expression' => $rec->custom_expression,
                    'is_specific_notification' => $rec->is_specific_notification,
                    'notification_type_id' => $rec->notification_type_id,
                    'notification_group_id' => $rec->notification_group_id,
                    'notificationschedule_type_id' => $rec->notificationschedule_type_id,
                    
                );
            }
            $res = ['success' => true, 'data' => $email_config_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }


    public function onLoadTransactionPaymentIntegration(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_payment_integration';
            $email_config_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('par_paymentremittance_options as t2', 't1.paymentremittance_options_id', 't2.id')
                ->leftJoin('par_paymentintegration_types as t3', 't1.paymentintegrationtype_id', 't3.id')
                        
               

                ->select(
                    't1.*',
                    't2.name as payment_remittance_options',
                    't3.name as payment_integration_type',               
                                      
                );

            $data = $sql->get();
            foreach ($data as $rec) {
                $email_config_data[] = array(
                    'id' => $rec->id,
                    'name' => $rec->name,
                    'description' => $rec->description,
                    'is_enabled' => $rec->is_enabled,
                    'code' => $rec->code,
                    'signed_fields_name' => $rec->signed_fields_name,
                    'payment_url' => $rec->payment_url,
                    'paymentremittance_options_id' => $rec->paymentremittance_options_id,
                    'paymentintegrationtype_id' => $rec->paymentintegrationtype_id,
                                      
                );
            }
            $res = ['success' => true, 'data' => $email_config_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }


    public function onLoadSystemAdministrationData(Request $req)
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

            $data = $sql->get();

            $res = array('success' => true, 'data' => $data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onLoadSystemGroupsUsers(Request $req)
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

            $data = $sql->get();

            $res = array('success' => true, 'data' => $data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }



    public function onDeleteSystemAdministrationDetails(Request $req)
    {
        try {
            $record_id = $req->id;
            $table_name = $req->table_name;
            $title = $req->title;
            $user_id = $req->user_id;
            $data = array();
            //get the records 
            $resp = false;
            $where_state = array('id' => $record_id);

            $records = DB::table($table_name)
                ->where($where_state)
                ->get();

            if (count($records) > 0) {
                //delete functionality
                $previous_data = getPreviousRecords($table_name, $where_state);

                $resp = deleteRecordNoTransaction($table_name, $previous_data['results'], $where_state, $user_id);
            }
            if ($resp['success']) {
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



    public function getAppUserGroupNavigationMenus(Request $req)
    {
        try {
            $level = 0;
            $user_group_id = $req->user_group_id;
            $account_type_id = $req->account_type_id;


            $navigationItems = DB::table('wf_navigation_items as t1')
                ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
                ->leftJoin('sys_usergroup_navpermissions as t4', function ($join) use ($user_group_id) {
                    $join->on('t1.id', '=', 't4.navigation_item_id')
                        ->on('t4.user_group_id', '=', DB::raw($user_group_id));
                })
                ->leftjoin('wf_navigation_types as t5', 't1.navigation_type_id', 't5.id')
                ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't4.user_access_levels_id', 't4.navigation_item_id', 't4.user_group_id')
                ->orderBy('t1.order_no')
                ->where(array('level' => $level, 'account_type_id' => $account_type_id))


                ->get();

            $rootItems = array();
            // This will store items in a hierarchical structure
            $hierarchicalItems = [];

            // Group items by their parent_id to create a hierarchical structure
            foreach ($navigationItems as $item) {

                $parent_id = $item->id;
                $level = 1;
                $childrens = $this->getNavigationItemsChildrens($parent_id, $level, $user_group_id, $account_type_id);
                if (!empty($childrens)) {
                    $item->children = $childrens;
                    $rootItems[] = $item;
                } else {
                    $rootItems[] = $item;
                }
            }

            $res = $rootItems;
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    function getNavigationItemsChildrens($parent_id, $level, $user_group_id, $account_type_id)
    {
        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
            ->leftJoin('sys_usergroup_navpermissions as t4', function ($join) use ($user_group_id, $account_type_id) {
                $join->on('t1.id', '=', 't4.navigation_item_id')
                    ->on('t4.user_group_id', '=', DB::raw($user_group_id))
                    ->on('t1.account_type_id', '=', DB::raw($account_type_id));
            })
            ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't4.user_access_levels_id', 't4.navigation_item_id', 't4.user_group_id')

            ->orderBy('order_no')
            ->where(array('level' => $level, 'parent_id' => $parent_id))->get();
        foreach ($navigationItems as $item) {

            $child_id = $item->id;
            $level_child = 2;
            //check for the next level 
            $grand_children = $this->grandNavigationschildfunction($child_id, $level_child, $user_group_id, $account_type_id);
            if (!empty($grand_children)) {

                $item->children = $grand_children;
                $childrens[] = $item;
            } else {
                $childrens[] = $item;
            }
        }

        return $childrens;
    }
    function grandNavigationschildfunction($parent_id, $level, $user_group_id, $account_type_id)
    {
        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
            ->leftJoin('sys_usergroup_navpermissions as t4', function ($join) use ($user_group_id, $account_type_id) {
                $join->on('t1.id', '=', 't4.navigation_item_id')
                    ->on('t4.user_group_id', '=', DB::raw($user_group_id))
                    ->on('t1.account_type_id', '=', DB::raw($account_type_id));
            })
            ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't4.user_access_levels_id', 't4.navigation_item_id', 't4.user_group_id')
            ->where(array('level' => $level, 'parent_id' => $parent_id))->get();

        foreach ($navigationItems as $child) {

            $childrens[] = $child;
        }

        return $childrens;
    }

    public function onSavingUserNavigationPermissions(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = $req->table_name;
            $permission_data = $req->permission_data;
            $record_id = $req->id;

            $permission_data = json_decode($permission_data);
            if (is_array($permission_data)) {

                foreach ($permission_data as $rec) {

                    $navigation_item_id = $rec->navigation_id;
                    $user_group_id = $rec->user_group_id;
                    $user_access_levels_id = $rec->user_access_levels_id;
                    $where = array('navigation_item_id' => $navigation_item_id, 'user_group_id' => $user_group_id);

                    $records = DB::table($table_name)->where($where)->get();
                    $data = array(
                        'navigation_item_id' => $navigation_item_id,
                        'user_access_levels_id' => $user_access_levels_id,
                        'user_group_id' => $user_group_id
                    );

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


            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
 
    public function getAppUserGroupWorkflowPermission(Request $req)
    {
        try {
            $user_group_id = $req->user_group_id;

            $data = DB::table('wf_workflow_stages as t1')
                ->leftJoin('wf_workflow_definition as t3', 't1.workflow_id', 't3.id')
                ->leftJoin('sys_user_workflowstagepermissions as t4', function ($join) use ($user_group_id) {
                    $join->on('t1.id', '=', 't4.workflow_stage_id')
                        ->on('t4.user_group_id', '=', DB::raw($user_group_id));
                })
                ->select('t1.*', 't3.name as workflow_name', 't1.name as workflow_stage', 't4.user_access_levels_id', 't1.id as workflow_stage_id', 't4.user_group_id')
                ->orderBy('t1.order_no')
                ->get();

            $res = array('success' => true, 'data' => $data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }



    public function getAppUserGroupRegulatoryFunctions(Request $req)
    {
        try {
            $user_group_id = $req->user_group_id;

            $data = DB::table('par_regulatory_functions as t1')
                ->leftJoin('par_regulatoryfunctionaccess_groups as t2', function ($join) use ($user_group_id) {
                    $join->on('t1.id', '=', 't2.regulatory_function_id')
                        ->on('t2.user_group_id', '=', DB::raw($user_group_id));
                })
                ->select('t1.*')
                ->orderBy('t1.order_no')
                ->get();

            $res = array('success' => true, 'data' => $data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    // public function getAppUserGroupUsers(Request $req)
    // {
    //     try {
    //         $user_group_id = $req->user_group_id;

    //         $data = DB::table('par_regulatory_functions as t1')
    //             ->leftJoin('par_regulatoryfunctionaccess_groups as t2', function ($join) use ($user_group_id) {
    //                 $join->on('t1.id', '=', 't2.regulatory_function_id')
    //                     ->on('t2.user_group_id', '=', DB::raw($user_group_id));
    //             })
    //             ->select('t1.*')
    //             ->orderBy('t1.order_no')
    //             ->get();

    //         $res = array('success' => true, 'data' => $data);
    //     } catch (\Exception $exception) {
    //         $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     } catch (\Throwable $throwable) {
    //         $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     }
    //     return response()->json($res, 200);
    // }

    public function getAppUserGroupUsers(Request $req)
{
    try {
        $data = DB::table('tra_user_group')
            ->select('*')
            ->orderBy('order_no')
            ->get();

        $res = ['success' => true, 'data' => $data];
       
    } catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    }
    
    return response()->json($res, 200);
}

public function getAppHscodes(Request $req)
{
    try {
        $requestData = $req->all();
        $table_name = 'tra_transactionpermit_hs_codes';
        $permit_certificate_templates_data = array();
        unset($requestData['table_name']);
      

        $sql = DB::table($table_name . ' as t1')
            ->leftJoin('tra_transactionpermit_types as t2', 't1.transactionpermit_type_id', 't2.id')
            ->leftJoin('par_hscode_seloption as t3', 't1.hscode_seloption_id', 't3.id')
            ->leftJoin('par_quota_limitationstype as t4', 't1.quota_limitationstype_id', 't4.id')
            ->leftJoin('par_mapping_status as t5', 't1.mapping_status_id', 't5.id')
            ->leftJoin('par_hscodemapping_option as t6', 't1.hscodemapping_option_id', 't6.id')
            ->leftJoin('tra_permit_special_conditions as t7', 't1.special_conditions_id', 't7.id')
            ->select(
                't1.*',
                't3.name as hs_code_selection_option',
                't4.name as quota_limitationstype',
                't5.name as mapping_status',
                't6.name as hscodemapping_option',
                't7.name as special_conditions'
            );

        
        if (isset($requestData['transactionpermit_type_id']) && !empty($requestData['transactionpermit_type_id'])) {
            $sql->where('t1.transactionpermit_type_id', '=', $requestData['transactionpermit_type_id']);
        }

           

        $data = $sql->get();
        foreach ($data as $rec) {
            $permit_certificate_templates_data[] = array(
                'id' => $rec->id,
                'name' => $rec->name,
                'description' => $rec->description,
                'special_conditions_id' => $rec->special_conditions_id,
                'limitation_description' => $rec->limitation_description,
                'code' => $rec->code,
                'is_enabled' => $rec->is_enabled,
                'hs_code_start_int' => $rec->hs_code_start_int,
                'hs_code_end_int' => $rec->hs_code_end_int,
                'hs_code_specific_int' => $rec->hs_code_specific_int,
                'transactionpermit_type_id' => $rec->transactionpermit_type_id,
                'hscode_seloption_id' => $rec->hscode_seloption_id,
                'quota_limitationstype_id' => $rec->quota_limitationstype_id,
                'mapping_status_id'  => $rec->mapping_status_id,
                'hscodemapping_option_id' => $rec->hscodemapping_option_id,
                'hs_code_selection_option' => $rec->hs_code_selection_option,
                'quota_limitationstype' => $rec->quota_limitationstype,
                'mapping_status' => $rec->mapping_status,
                'hscodemapping_option' => $rec->hscodemapping_option,
                'special_conditions' => $rec->special_conditions,
            );
        }
        $res = ['success' => true, 'data' => $permit_certificate_templates_data];
    } catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    }

    return response()->json($res, 200);
}
public function getUserDetails(Request $req)
{
    try {
        $users = [];
        $requestData = $req->all();
        $table_name = 'tra_user_group';
        $groupId = $req->input('group_id');
        $organisationId = $req->input('organisation_id');

        Log::info('Request Data getUserDetails:', $req->all());

        if (!$groupId) {
            return response()->json([
                'success' => false,
                'message' => 'Group ID is required.'
            ], 400);
        }

        if (!$organisationId) {
            return response()->json([
                'success' => false,
                'message' => 'Organisation ID is required.'
            ], 400);
        }

        $sql = DB::table($table_name . ' as t1')
            ->join('usr_users_information as t2', 't1.user_id', '=', 't2.id')
            ->where('t1.group_id', $groupId)
            ->where('t1.organisation_id', $organisationId)
            ->select(
                't2.id',             
                't2.first_name',
                't2.email_address',
                't2.created_on',
                't2.is_enabled'
            );

        if (DB::table($table_name)->where('group_id', $groupId)->doesntExist()) {
            return response()->json([
                'success' => false,
                'message' => 'You must save your details first before viewing user data.'
            ], 403);
        }

        
        $data = $sql->get();
        foreach ($data as $rec) {
            $users[] = [
                'id' => $rec->id,
                'first_name' => aes_decrypt($rec->first_name),
                'email_address' => aes_decrypt($rec->email_address),
                'is_enabled' => $rec->is_enabled  
            ];
        }

        return response()->json(['success' => true, 'data' => $users]);

    } catch (\Exception $exception) {
        return response()->json(sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__)), 500);
    } catch (\Throwable $throwable) {
        return response()->json(sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__)), 500);
    }
}
// public function getUserDetails(Request $req)
// {
//     try {
//         $groupId = $req->input('group_id');
//         if (!$groupId) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'Group ID is required.'
//             ], 400);
//         }

//         $users = DB::table('tra_user_group as t1')
//         ->join('usr_users_information as t2', 't1.user_id', '=', 't2.id')
//         ->where('t1.group_id', '=', $groupId)
//         ->select(
//             't2.id',             
//             't2.first_name',
//             't2.email_address',
//             't2.created_on',
//             't2.is_enabled'
//         )
//         ->get();

//         $res = ['success' => true, 'data' => $users];
//     } catch (\Exception $exception) {
//         $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
//     } catch (\Throwable $throwable) {
//         $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
//     }

//     return response()->json($res, 200);

//     return response()->json($res, 200);
// }



public function onGetStartHsCode(Request $req)
{
    try {
        $table_name = 'par_hscodesheading_definations';
        $take = 50; // Default take value
        $skip = 0; // Default skip value
        $searchValue = $req->searchValue ?? '';
        $chapters_keywordsearch = $req->chapters_keywordsearch;

        // Process search value
        $search_value = '';
        if (!empty($searchValue) && $searchValue !== 'undefined') {
            $searchValueArray = explode(',', $searchValue);
            $search_value = $searchValueArray[2] ?? '';
        }

        // Initialize query with necessary joins and select statements
        $query = DB::table("{$table_name} as t1")
            ->leftJoin('par_hscodechapters_defination as t3', 't1.chapters_defination_id', '=', 't3.id')
            
            
            ->select(
                't1.id',
                't1.chapters_defination_id',
                't3.name as hscodechapters',
                
            );

        // Apply keyword search filter before fetching data
        if (!empty($chapters_keywordsearch)) {
            $query->where(function ($q) use ($chapters_keywordsearch) {
                $q->where('t1.chapters_defination_id', 'like', "%{$chapters_keywordsearch}%")
                    ->orWhere('t1.heading_definations_id', 'like', "%{$chapters_keywordsearch}%");
                   
            });
        }

        // Fetch total count before pagination
        $totalCount = $query->count();

        // Apply pagination
        $data = $query->orderByDesc('t1.id')->take($take)->skip($skip)->get();

        // Transform data efficiently
        $productregistry_data = $data->map(function ($rec) {
            return [
                'id' => $rec->id,
                'start_hs_code' => $rec->start_hs_code,
                'chapters_defination_id' => $rec->chapters_defination_id,               
                'hscodechapters' => trim("{$rec->chapterscode} {$rec->hscodechapters}"),
               
                
                
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $productregistry_data,
            'totalCount' => $totalCount
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}

public function onGetEndHsCode(Request $req)
{
    try {
        $table_name = 'par_hscodesheading_definations';
        $take = 50; // Default take value
        $skip = 0; // Default skip value
        $searchValue = $req->searchValue ?? '';
        $chapters_keywordsearch = $req->chapters_keywordsearch;

        // Process search value
        $search_value = '';
        if (!empty($searchValue) && $searchValue !== 'undefined') {
            $searchValueArray = explode(',', $searchValue);
            $search_value = $searchValueArray[2] ?? '';
        }

        // Initialize query with necessary joins and select statements
        $query = DB::table("{$table_name} as t1")
            ->leftJoin('par_hscodechapters_defination as t3', 't1.chapters_defination_id', '=', 't3.id')
            
            
            ->select(
                't1.id',
                't1.chapters_defination_id',
                't3.name as hscodechapters',
                
            );

        // Apply keyword search filter before fetching data
        if (!empty($chapters_keywordsearch)) {
            $query->where(function ($q) use ($chapters_keywordsearch) {
                $q->where('t1.chapters_defination_id', 'like', "%{$chapters_keywordsearch}%")
                    ->orWhere('t1.heading_definations_id', 'like', "%{$chapters_keywordsearch}%");
                   
            });
        }

        // Fetch total count before pagination
        $totalCount = $query->count();

        // Apply pagination
        $data = $query->orderByDesc('t1.id')->take($take)->skip($skip)->get();

        // Transform data efficiently
        $productregistry_data = $data->map(function ($rec) {
            return [
                'id' => $rec->id,
                'end_hs_code' => $rec->start_hs_code,
                'chapters_defination_id' => $rec->chapters_defination_id,               
                'hscodechapters' => trim("{$rec->chapterscode} {$rec->hscodechapters}"),
               
                
                
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $productregistry_data,
            'totalCount' => $totalCount
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}



public function onGetSpecificHsCode(Request $req)
{
    try {
        $table_name = 'par_hscodessubheading_defination';
        $take = 50; // Default take value
        $skip = 0; // Default skip value
        $searchValue = $req->searchValue ?? '';
        $chapters_keywordsearch = $req->chapters_keywordsearch;

        // Process search value
        $search_value = '';
        if (!empty($searchValue) && $searchValue !== 'undefined') {
            $searchValueArray = explode(',', $searchValue);
            $search_value = $searchValueArray[2] ?? '';
        }

        // Initialize query with necessary joins and select statements
        $query = DB::table("{$table_name} as t1")
            ->leftJoin('par_hscodechapters_defination as t3', 't1.chapters_defination_id', '=', 't3.id')
            
            
            ->select(
                't1.id',
                't1.chapters_defination_id',
                't3.name as hscodechapters',
                
            );

        // Apply keyword search filter before fetching data
        if (!empty($chapters_keywordsearch)) {
            $query->where(function ($q) use ($chapters_keywordsearch) {
                $q->where('t1.chapters_defination_id', 'like', "%{$chapters_keywordsearch}%")
                    ->orWhere('t1.heading_definations_id', 'like', "%{$chapters_keywordsearch}%");
                   
            });
        }

        // Fetch total count before pagination
        $totalCount = $query->count();

        // Apply pagination
        $data = $query->orderByDesc('t1.id')->take($take)->skip($skip)->get();

        // Transform data efficiently
        $productregistry_data = $data->map(function ($rec) {
            return [
                'id' => $rec->id,
                'end_hs_code' => $rec->start_hs_code,
                'chapters_defination_id' => $rec->chapters_defination_id,               
                'hscodechapters' => trim("{$rec->chapterscode} {$rec->hscodechapters}"),
               
                
                
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $productregistry_data,
            'totalCount' => $totalCount
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}

public function onGetUserDetails(Request $req)
{
    try {
        $table_name = 'usr_users_information';
        $take = 50; // Default take value
        $skip = 0; // Default skip value
        $searchValue = $req->searchValue ?? '';
        $chapters_keywordsearch = $req->chapters_keywordsearch;

        // Process search value
        $search_value = '';
        if (!empty($searchValue) && $searchValue !== 'undefined') {
            $searchValueArray = explode(',', $searchValue);
            $search_value = $searchValueArray[2] ?? '';
        }

        // Initialize query with necessary joins and select statements
        $query = DB::table("{$table_name} as t1")
            ->leftJoin('usr_users_title as t2', 't1.user_title_id', '=', 't2.id')
            ->leftJoin('usr_identification_type as t3', 't1.identification_type_id', '=', 't3.id')
            ->leftJoin('par_countries as t4', 't1.country_of_origin_id', '=', 't4.id')
            ->leftJoin('tra_organisation_information as t5', 't1.organisation_id', '=', 't5.id')
            ->leftJoin('sys_account_types as t6', 't1.account_type_id', '=', 't6.id')
            ->leftJoin('usr_usersaccount_roles as t7', 't1.account_roles_id', '=', 't7.id')
            
            
            
            ->select(
                't1.id',
                't1.chapters_defination_id',
                't3.name as hscodechapters',
                
            );

        // Apply keyword search filter before fetching data
        if (!empty($chapters_keywordsearch)) {
            $query->where(function ($q) use ($chapters_keywordsearch) {
                $q->where('t1.user_title_id', 'like', "%{$chapters_keywordsearch}%")
                    ->orWhere('t1.identification_type_id', 'like', "%{$chapters_keywordsearch}%")
                    ->orWhere('t1.country_of_origin_id', 'like', "%{$chapters_keywordsearch}%")
                    ->orWhere('t1.organisation_id', 'like', "%{$chapters_keywordsearch}%")
                    ->orWhere('t1.account_type_id', 'like', "%{$chapters_keywordsearch}%")
                    ->orWhere('t1.account_roles_id', 'like', "%{$chapters_keywordsearch}%");
            });
        }


        // Fetch total count before pagination
        $totalCount = $query->count();

        // Apply pagination
        $data = $query->orderByDesc('t1.id')->take($take)->skip($skip)->get();

        // Transform data efficiently
        $productregistry_data = $data->map(function ($rec) {
            return [
                'id' => $rec->id,
                'start_hs_code' => $rec->start_hs_code,
                'user_title_id' => $rec->user_title_id,   
                'identification_type_id' => $rec->identification_type_id,
                'country_of_origin_id' => $rec->country_of_origin_id,            
                'organisation_id' => $rec->organisation_id,
                'account_type_id' => $rec->account_type_id,
                'account_roles_id' => $rec->account_roles_id,
                
                // 'hscodechapters' => trim("{$rec->chapterscode} {$rec->hscodechapters}"),
               
                
                
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $productregistry_data,
            'totalCount' => $totalCount
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}

    public function getAppPermitSignatoriesData(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_transactionpermit_signatories';
            $permit_signatories_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('tra_transactionpermit_types as t2', 't1.transactionpermit_type_id', 't2.id')
                ->leftJoin('par_permittemplate_types as t3', 't1.permit_template_type_id', 't3.id')
                ->leftJoin('par_permit_templates as t4', 't1.permit_template_id', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', 't5.id')

                ->select(
                    't1.*',
                    't3.name as permit_template_type',
                    't4.name as permit_template',
                    't5.name as workflow_stage'
                   
                );

                if (isset($requestData['transactionpermit_type_id']) && !empty($requestData['transactionpermit_type_id'])) {
                    $sql->where('t1.transactionpermit_type_id', '=', $requestData['transactionpermit_type_id']);
                }


            $data = $sql->get();
            foreach ($data as $rec) {
                $permit_signatories_data[] = array(
                    'id' => $rec->id,
                    'name' => $rec->name,
                    'description' => $rec->description,
                    'permit_signatory' => $rec->permit_signatory,
                    'is_approval_document' => $rec->name,
                    'code' => $rec->code,
                    'is_enabled' => $rec->is_enabled,
                    'transactionpermit_type_id' => $rec->transactionpermit_type_id,
                    'permit_template_type_id' => $rec->permit_template_type_id,
                    'permit_template_id' => $rec->permit_template_id,
                    'workflow_stage_id' => $rec->workflow_stage_id,
                    'permit_template_type' => $rec->permit_template_type,
                    'permit_template' => $rec->permit_template,
                    'workflow_stage' => $rec->workflow_stage

                    
                );
            }
            $res = ['success' => true, 'data' => $permit_signatories_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    

    public function getAppPermitSpecialConditions(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_permit_special_conditions';
            $permit_report_generation_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('tra_transactionpermit_types as t2', 't1.transactionpermit_type_id', 't2.id')
                ->leftJoin('par_quota_limitationstype as t3', 't1.quota_limitationstype_id', 't3.id')

                ->select(
                    't1.*',
                    't3.name as quota_limitationstype',
                );

                if (isset($requestData['transactionpermit_type_id']) && !empty($requestData['transactionpermit_type_id'])) {
                    $sql->where('t1.transactionpermit_type_id', '=', $requestData['transactionpermit_type_id']);
                }



            $data = $sql->get();
            foreach ($data as $rec) {
                $permit_report_generation_data[] = array(
                    'id' => $rec->id,
                    'transactionpermit_type_id' => $rec->transactionpermit_type_id,
                    'quota_limitationstype_id' => $rec->quota_limitationstype_id,
                    'limitation_description' => $rec->limitation_description,
                    'special_conditions' => $rec->special_conditions,
                    'quota_limitationstype' => $rec->quota_limitationstype,
                );
            }
            $res = ['success' => true, 'data' => $permit_report_generation_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function getAdditionalFormFields(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_transactionpermit_prodadditionafields';
            $additional_form_fields_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('tra_transactionpermit_types as t2', 't1.transactionpermit_type_id', 't2.id')
    

                ->select(
                    't1.*',
                  
                );

                if (isset($requestData['transactionpermit_type_id']) && !empty($requestData['transactionpermit_type_id'])) {
                    $sql->where('t1.transactionpermit_type_id', '=', $requestData['transactionpermit_type_id']);
                }



            $data = $sql->get();
            foreach ($data as $rec) {
                $additional_form_fields_data[] = array(
                    'id' => $rec->id,
                    'name' => $rec->name,
                    'default_value' => $rec->default_value,
                    'is_readonly' => $rec->is_readonly,
                    'is_hidden' => $rec->is_hidden,
                    'is_mandatory' => $rec->is_mandatory,
                    'transactionpermit_type_id' => $rec->transactionpermit_type_id,
                    
                );
            }
            $res = ['success' => true, 'data' => $additional_form_fields_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function getAppPermitRequiredDocuments(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_transactionpermit_requireddocuments';
            $permit_report_generation_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('tra_transactionpermit_types as t2', 't1.transactionpermit_type_id', 't2.id')
                ->leftJoin('par_document_types as t3', 't1.document_type_id', 't3.id')
                ->leftJoin('dms_document_requirements as t4', 't1.document_requirement_id', 't4.id')

                ->select(
                    't1.*',
                    't3.name as document_type',
                    't4.name as document_requirement'

                );
            
                if (isset($requestData['transactionpermit_type_id']) && !empty($requestData['transactionpermit_type_id'])) {
                    $sql->where('t1.transactionpermit_type_id', '=', $requestData['transactionpermit_type_id']);
                }

            $data = $sql->get();
            foreach ($data as $rec) {
                $permit_report_generation_data[] = array(
                    'id' => $rec->id,
                    'is_mandatory' => $rec->is_mandatory,
                    'allow_multiple' => $rec->allow_multiple,
                    'has_validity_period' => $rec->has_validity_period,
                    'validity_period' => $rec->validity_period,
                    'validity_defination' => $rec->validity_defination,
                    'status' => $rec->status,
                    'transactionpermit_type_id' => $rec->transactionpermit_type_id,
                    'document_type_id' => $rec->document_type_id,
                    'document_requirement_id' => $rec->document_requirement_id,
                    'document_type' => $rec->document_type,
                    'document_requirement' => $rec->document_requirement,


                );
            }
            $res = ['success' => true, 'data' => $permit_report_generation_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function getAppPermitChecklist(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_transactionpermit_checklists';
            $permit_checklists_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')

                ->leftJoin('tra_transactionpermit_types as t2', 't1.transactionpermit_type_id', 't2.id')
                ->leftJoin('chk_checklist_types as t3', 't1.checklist_type_id', 't3.id')
                ->leftJoin('chk_checklist_definations as t4', 't1.checklist_defination_id', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', 't5.id')

                ->select(
                    't1.*',
                    't3.name as checklist_type',
                    't4.name as checklist_defination',
                    't5.name as workflow_stage',


                );
             

                if (isset($requestData['transactionpermit_type_id']) && !empty($requestData['transactionpermit_type_id'])) {
                    $sql->where('t1.transactionpermit_type_id', '=', $requestData['transactionpermit_type_id']);
                }

            $data = $sql->get();
            foreach ($data as $rec) {
                $permit_checklists_data[] = array(
                    'id' => $rec->id,
                    'is_mandatory' => $rec->is_mandatory,
                    'has_query_check' => $rec->has_query_check,
                    'workflow_stage_id' => $rec->workflow_stage_id,
                    'transactionpermit_type_id' => $rec->transactionpermit_type_id,
                    'checklist_type_id' => $rec->checklist_type_id,
                    'checklist_defination_id' => $rec->checklist_defination_id,
                    'checklist_type' => $rec->checklist_type,
                    'checklist_defination' => $rec->checklist_defination,


                );
            }
            $res = ['success' => true, 'data' => $permit_checklists_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onSaveSystemGuideline(Request $req)
    {
        try {
            $process_id = 17;
            $appworkflow_status_id = 1;

            $application_code = $req->application_code;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'sys_systemguidelines_detail';
            $guidelines = base64_decode($req->guidelines);

            $dataguidelines = mb_convert_encoding($guidelines, 'UTF-8', 'UTF-8');

            $data = array(
                'systemguide_id' => $req->systemguide_id,
                'systems_functionality_id' => $req->systems_functionality_id,
                'dashboard_type_id' => $req->dashboard_type_id,
                'guideline_step_no' => $req->guideline_step_no,
                'guidelines' => $dataguidelines
            );

            if (!validateIsNumeric($application_code)) {
                // Creating a new record
                $application_code = generateApplicationCode($process_id, $table_name);
                $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                $data['app_reference_no'] = $app_reference_no;
                $data['created_by'] = $user_id;
                $data['process_id'] = $process_id;
                $data['application_code'] = $application_code;
                $data['appworkflow_status_id'] = $appworkflow_status_id;
                $data['created_on'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $user_name);
                $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id);
            } else {
                // Updating an existing record
                $where = array('application_code' => $application_code);
                $previous_data = getPreviousRecords($table_name, $where);

                if ($previous_data && recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = $previous_data['results'];
                    $app_reference_no = $previous_data[0]['app_reference_no'];
                    if (empty($app_reference_no)) {
                        $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                        $data['app_reference_no'] = $app_reference_no;
                    }
                    $data['application_code'] = $application_code;
                    $resp = updateRecord($table_name, $previous_data, $where, $data, $user_name);
                } else {
                    $resp = array(
                        'success' => false,
                        'message' => 'Record does not exist'
                    );
                }
            }

            if ($resp['success']) {
                $eoi_id = $resp['record_id'];

                $res = array(
                    'success' => true,
                    'application_code' => $application_code,
                    'app_reference_no' => $app_reference_no,
                    'systemguide_id' => $eoi_id,
                    'message' => 'Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onLoadSystemGuideline(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'sys_systemguidelines_detail';
            $appworkflow_status_id = $req->appworkflow_status_id;
            $eoi_data = [];
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_workflowstatuses_actions as t6', function ($join) {
                    $join->on('t1.appworkflow_status_id', '=', 't6.workflow_status_id');
                    $join->on('t1.process_id', '=', 't6.process_id');
                    $join->on('t6.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t7', 't6.statuses_action_id', 't7.id')
                ->leftJoin('wf_appworkflow_statuses as t8', 't1.appworkflow_status_id', 't8.id')
                ->leftJoin('par_systems_functionalities as t11', 't1.systems_functionality_id', 't11.id')
                ->leftJoin('sys_dashboard_types as t9', 't1.dashboard_type_id', 't9.id')
                ->select('t1.id as systemguide_id', 't8.name as appworkflow_status', 't11.name as systems_functionality', 't9.name as dashboard_type', 't1.*', 't7.name as action_name', 't7.iconCls', 't7.action');

            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('t1.appworkflow_status_id', $appworkflow_status_id);
            }

            $process_id = 17;
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();
            foreach ($data as $rec) {
                $eoi_data[] = [
                    'id' => $rec->systemguide_id,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'systems_functionality_id' => $rec->systems_functionality_id,
                    'dashboard_type_id' => $rec->dashboard_type_id,
                    'application_code' => $rec->application_code,
                    'guideline_step_no' => $rec->guideline_step_no,
                    'guidelines' => $rec->guidelines,
                    'app_reference_no' => $rec->app_reference_no,
                    'systems_functionality' => $rec->systems_functionality,
                    'dashboard_type' => $rec->dashboard_type,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'action' => $rec->action,
                    'iconCls' => $rec->iconCls,
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                ];
            }

            $res = ['success' => true, 'data' => $eoi_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function onLoadSystemManualGuidelines(Request $req)
    {
        try {
            $dashboard_type_id = $req->dashboard_type_id;
            $process_id = $req->process_id;
            $systems_functionality_id = $req->systems_functionality_id;
            $system_guidelines = array();
            $process_records = DB::table('wf_processes')->select('name as process_name', 'id');
            $guideline_data = array();
            $functionaly_datetails = array();
            if (validateIsNumeric($process_id)) {
                $process_records->where('id', $process_id);
            }
            $process_records = $process_records->get();
            foreach ($process_records as $process_record) {
                $process_id = $process_record->id;
                //then get the functionality 
                $functionaly_data = DB::table('par_systems_functionalities')->select('name as functionality_name', 'id')
                    ->where('process_id', $process_id);
                if (validateIsNumeric($systems_functionality_id)) {
                    $functionaly_data->where('id', $systems_functionality_id);
                }
                $functionaly_data = $functionaly_data->get();
                if ($functionaly_data->count() > 0) {
                    $process_data = $process_record;
                    $functionaly_datetails = array();
                    foreach ($functionaly_data as $func_data) {

                        $system_functionality_id = $func_data->id;
                        $guideline_data = $this->getSystemGuidelines($process_id, $system_functionality_id, $dashboard_type_id);

                        if ($guideline_data->count() > 0) {

                            $func_data->guideline_data = $guideline_data;
                            $functionaly_datetails[] = $func_data;
                        }
                    }
                    $process_data->functionaly_data = $functionaly_datetails;
                    $system_guidelines[] = $process_data;
                }
            }

            $res = ['success' => true, 'data' => $system_guidelines];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    function getSystemGuidelines($process_id, $systems_functionality_id, $dashboard_type_id)
    {
        $guidelines = array();
        $records = DB::table('sys_systemguidelines_detail')
            ->select('guidelines', 'guideline_step_no')
            ->where(array('process_id' => $process_id, 'systems_functionality_id' => $systems_functionality_id))
            ->orderBy('guideline_step_no', 'asc');

        if (validateIsNumeric($dashboard_type_id)) {
            $records->where('dashboard_type_id', $dashboard_type_id);
        }
        $records = $records->get();

        return $records;
    }

    public function onLoadsystemGuidelinesProcesses(Request $req)
    {
        try {
            $dashboard_type_id = $req->dashboard_type_id;
            $process_id = $req->process_id;

            $records = DB::table('sys_systemguidelines_detail as t1')
                ->join('wf_processes as t2', 't1.process_id', 't2.id')
                ->select('t2.name', 't2.id')
                ->where(array('dashboard_type_id' => $dashboard_type_id))
                ->orderBy('t2.name', 'asc')
                ->groupBy('t2.id');
            if (validateIsNumeric($process_id)) {
                $records = $records->where('process_id', $process_id);
            }
            $records = $records->get();

            $res = ['success' => true, 'data' => $records];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onLoadsystemSignInUpGuidelines(Request $req)
    {
        try {
            $guideline_option_id = $req->guideline_option_id;
            if (!validateIsNumeric($guideline_option_id)) {
                $guideline_option_id = 1;
            }
            $records = DB::table('sys_signinsignup_guidelines as t1')
                ->select('t1.*')
                ->orderBy('t1.guideline_step_no', 'asc');

            if (validateIsNumeric($guideline_option_id)) {
                $records = $records->where('guideline_option_id', $guideline_option_id);
            }
            $records = $records->get();
            $records = encrypt_data($records);

            $res = ['success' => true, 'data' => $records];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onLoadsystemGuidelinesFunctionaliites(Request $req)
    {
        try {
            $process_id = $req->process_id;

            $records = DB::table('sys_systemguidelines_detail as t1')
                ->join('par_systems_functionalities as t2', 't1.systems_functionality_id', 't2.id')
                ->select('t2.name', 't2.id')
                ->where(array('t2.process_id' => $process_id))
                ->orderBy('t2.name', 'asc')
                ->groupBy('t2.id')
                ->get();

            $res = ['success' => true, 'data' => $records];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }


    public function onSavingUserWorkflowPermissions(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = $req->table_name;
            $permission_data = $req->permission_data;
            $record_id = $req->id;

            $permission_data = json_decode($permission_data);
            if (is_array($permission_data)) {

                foreach ($permission_data as $rec) {

                    $workflow_stage_id = $rec->workflow_stage_id;
                    $user_group_id = $rec->user_group_id;
                    $user_access_levels_id = $rec->user_access_levels_id;
                    $where = array('workflow_stage_id' => $workflow_stage_id, 'user_group_id' => $user_group_id);

                    $records = DB::table($table_name)->where($where)->get();
                    $data = array(
                        'workflow_stage_id' => $workflow_stage_id,
                        'user_access_levels_id' => $user_access_levels_id,
                        'user_group_id' => $user_group_id
                    );

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


            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }


    public function onSavingRegulatoryFunctionPermissions(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = $req->table_name;
            $permission_data = $req->permission_data;
            $record_id = $req->id;

            $permission_data = json_decode($permission_data);
            if (is_array($permission_data)) {

                foreach ($permission_data as $rec) {

                    $regulatory_function_id = $rec->regulatory_function_id;
                    $user_group_id = $rec->user_group_id;
                    $user_access_levels_id = $rec->user_access_levels_id;
                    $where = array('regulatory_function_id' => $regulatory_function_id, 'user_group_id' => $user_group_id);

                    $records = DB::table($table_name)->where($where)->get();
                    $data = array(
                        'regulatory_function_id' => $regulatory_function_id,
                        'user_access_levels_id' => $user_access_levels_id,
                        'user_group_id' => $user_group_id
                    );

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


            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
}
