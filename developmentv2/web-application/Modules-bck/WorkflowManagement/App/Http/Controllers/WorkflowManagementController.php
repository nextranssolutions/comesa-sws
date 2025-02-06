<?php

namespace Modules\WorkflowManagement\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class WorkflowManagementController extends Controller
{
    public function getAllNavigationItems(Request $req)
    {
        try {
            $level = $req->level;
            $parent_id = $req->parent_id;
            //wf_navigation_levels
            $navigationItems = DB::table('wf_navigation_items as t1')
                ->leftJoin('sys_usergroup_navpermissions as t2', 't1.id', 't2.navigation_item_id')
                ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
                ->select('t1.*', 't3.routerlink', 't1.iconsCls')
                ->orderBy('t1.order_no');
            if (validateIsNumeric($level)) {
                $navigationItems->where(array('level' => $level));
            }
            if (validateIsNumeric($parent_id)) {
                $navigationItems->where(array('parent_id' => $parent_id));
            }
            $navigationItems = $navigationItems->get();

            $res = array(
                'success' => true,
                'data' => $navigationItems
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onSaveImageInformation(Request $req)
    {
        try {
            $data = $req->all();
            $table_name = $req->table_name;
            $resetcolumns = $req->resetcolumns;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $record_id = $req->id;

            // Unset unnecessary fields
            unset($data['user_id'], $data['user_name'], $data['table_name'], $data['resetcolumns']);

            if ($resetcolumns != '') {
                $restcolumn_array = explode(',', $resetcolumns);
                $data = array_diff_key($data, array_flip($restcolumn_array));
            }

            if ($req->hasFile('image_path')) {
                $file = $req->file('image_path');
                $extension = $file->getClientOriginalExtension();
                $savedName = 'image-' . rand(0, 10000) . '.' . $extension;

                // Get a dynamic public path, compatible with all OS environments
                $destination = public_path('resources/upload_folder');

                // Save file and store its path in the data array
                if ($file->move($destination, $savedName)) {
                    $data['image_path'] = $savedName;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }
            if (!validateIsNumeric($record_id)) {
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);

            }


            if ($resp) {
                return response()->json([
                    'success' => true,
                    'record_id' => $record_id,
                    'message' => 'Saved Successfully'
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to save record'
                ], 500);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }


    public function onLoadWorkflowData(Request $req)
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


    public function getUserNavigationItems(Request $req)
    {
        try {
            $rootItems = [];

            $navigation_type_id = $req->navigation_type_id;
            $userGroupId = $req->userGroupId;
            $user_id = $req->user_id;

            if (validateIsNumeric($userGroupId) || $navigation_type_id != 2) {
                //get the table data ,'user_group_id' => $userGroupId
                if (validateIsNumeric($user_id)) {
                    $users_groups = getSingleRecord('usr_users_information', array('id' => $user_id));
                    $userGroupId = $users_groups->user_group_id;
                }


                $is_super_admin = false;
                if ($navigation_type_id == 2) {
                    $is_super_admin = getRecordValFromWhere('usr_users_groups', array('id' => $userGroupId), 'is_super_admin');
                }

                $level = 0;
                $navigationItems = DB::table('wf_navigation_items as t1')
                    ->leftJoin('sys_usergroup_navpermissions as t2', 't1.id', 't2.navigation_item_id')
                    ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
                    ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't2.user_access_levels_id')
                    ->orderBy('t1.order_no')->where(array('level' => $level, 't1.navigation_type_id' => $navigation_type_id));
                if (!$is_super_admin && $navigation_type_id == 2) {
                    $navigationItems->where(array('user_group_id' => $userGroupId));
                }

                $navigationItems = $navigationItems->get();

                $rootItems = array();
                // This will store items in a hierarchical structure
                $hierarchicalItems = [];

                // Group items by their parent_id to create a hierarchical structure
                foreach ($navigationItems as $item) {

                    $parent_id = $item->id;
                    $level = 1;
                    $childrens = $this->getNavigationChildrens($parent_id, $level, $userGroupId, $is_super_admin, $navigation_type_id);
                    if (!empty($childrens)) {
                        $item->children = $childrens;
                        $rootItems[] = $item;
                    } else {
                        $rootItems[] = $item;
                    }
                }
            }
            $rootItems=encrypt_data($rootItems);

            $res = array(
                'success' => true,
                'navigation_items' => $rootItems
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    function getNavigationChildrens($parent_id, $level, $userGroupId, $is_super_admin, $navigation_type_id)
    {
        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('sys_usergroup_navpermissions as t2', 't1.id', 't2.navigation_item_id')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')

            ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't2.user_access_levels_id')
            ->orderBy('order_no', 'asc')
            ->where(array('level' => $level, 'parent_id' => $parent_id, 't1.navigation_type_id' => $navigation_type_id));
        if (!$is_super_admin && $navigation_type_id == 2) {
            $navigationItems->where(array('user_group_id' => $userGroupId));
        }
        $navigationItems = $navigationItems->get();
        foreach ($navigationItems as $item) {

            $child_id = $item->id;
            $level_child = 2;
            //check for the next level 
            $grand_children = $this->grandchildfunction($child_id, $level_child, $userGroupId, $is_super_admin, $navigation_type_id);
            if (!empty($grand_children)) {

                $item->children = $grand_children;
                $childrens[] = $item;
            } else {
                $childrens[] = $item;
            }
        }

        return $childrens;
    }
    function grandchildfunction($parent_id, $level, $userGroupId, $is_super_admin, $navigation_type_id)
    {

        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('sys_usergroup_navpermissions as t2', 't1.id', 't2.navigation_item_id')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
            ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't2.user_access_levels_id')
            ->orderBy('order_no')
            ->where(array('level' => $level, 'parent_id' => $parent_id, 't1.navigation_type_id' => $navigation_type_id));
        if (!$is_super_admin && $navigation_type_id == 2) {
            $navigationItems->where(array('user_group_id' => $userGroupId));
        }

        // $navigationItems = $navigationItems->get();
        $navigationItems = $navigationItems->distinct()->groupBy('t1.id', 't3.routerlink', 't2.user_access_levels_id')->get();
        foreach ($navigationItems as $child) {

            $childrens[] = $child;
        }

        return $childrens;
    }

    public function getWorkflowConfigs(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);

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

            if ($table_name == 'wf_workflow_stages') {
                $sql->orderBy('t1.id', 'asc');
            } else {
                $sql->orderBy('t1.name', 'asc');
            }
            $data = $sql->get();
            // Get pagination parameters from request
            // $page = $req->input('page', 1); // default to page 1
            // $perPage = $req->input('per_page', 10); // default to 10 items per page

            // Apply pagination
            //  $data = $sql->paginate($perPage, ['*'], 'page', $page);

            $res = array('success' => true, 'data' => $data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }



    //Navigation details 
    public function getAppNavigationMenus(Request $req)
    {
        try {
            $level = 0;
            $navigationItems = DB::table('wf_navigation_items as t1')
                ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
                ->select('t1.*', 't3.routerlink', 't1.iconsCls')
                ->orderBy('t1.order_no')->where(array('level' => $level))
                ->get();
            $rootItems = array();
            // This will store items in a hierarchical structure

            // Group items by their parent_id to create a hierarchical structure
            foreach ($navigationItems as $item) {

                $parent_id = $item->id;
                $level = 1;
                $childrens = $this->getNavigationItemsChildrens($parent_id, $level);
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
    function getNavigationItemsChildrens($parent_id, $level)
    {
        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
            ->select('t1.*', 't3.routerlink', 't1.iconsCls')
            ->orderBy('order_no')
            ->where(array('level' => $level, 'parent_id' => $parent_id))->get();
        foreach ($navigationItems as $item) {

            $child_id = $item->id;
            $level_child = 2;
            //check for the next level 
            $grand_children = $this->grandNavigationschildfunction($child_id, $level_child);
            if (!empty($grand_children)) {

                $item->children = $grand_children;
                $childrens[] = $item;
            } else {
                $childrens[] = $item;
            }
        }

        return $childrens;
    }
    function grandNavigationschildfunction($parent_id, $level)
    {
        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
            ->select('t1.*', 't3.routerlink', 't1.iconsCls')
            ->where(array('level' => $level, 'parent_id' => $parent_id))->get();

        foreach ($navigationItems as $child) {

            $childrens[] = $child;
        }

        return $childrens;
    }

    public function onsaveWorkflowConfigData(Request $req)
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

            if ($table_name != 'wf_workflow_definition' || $table_name != 'wf_workflowstatuses_actions') {
                //unset($data['process_id']);
            }
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
    public function onsaveNavigationItemsConfigData(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = $req->table_name;
            $record_id = $req->id;
            unset($data['user_id']);
            unset($data['user_name']);
            unset($data['table_name']);

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

    public function onDeleteWorkflowsDetails(Request $req)
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
            // print_r($where_state);
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



    public function onLoadworkflowStageData(Request $req)
    {
        try {

            $process_id = $req->process_id;
            $records = Db::table('wf_workflow_definition as t1')
                ->join('wf_workflow_stages  as t2', 't1.id', 't2.workflow_id')
                ->select('t2.*')
                // ->where(array('t1.process_id' => $process_id))
                ->get();
            $res = array('success' => true, 'data' => $records);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }
    public function onLoadWorkflowTransitionData(Request $req)
    {
        try {

            $workflow_action_id = $req->workflow_action_id;
            $record = Db::table('wf_workflow_transitions as t1')
                ->select('t1.*')
                ->where(array('t1.workflow_action_id' => $workflow_action_id))
                ->first();
            $res = array('success' => true, 'data' => $record);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }

    public function onLoadWorkflowStatusActions(Request $req)
    {
        try {

            $process_id = $req->process_id;
            $workflow_status_id = $req->workflow_status_id;
            if (!validateIsNumeric($workflow_status_id)) {
                $app_statusrecord = getInitialWorkflowStatusId($process_id);
                if (!$app_statusrecord) {

                    return response()->json([
                        'success' => false,
                        'message' => 'The Initial Workflow Status Has not been set, contact the system admin',
                    ], 200);
                }
                $workflow_status_id = $app_statusrecord->appworkflow_status_id;

            }
            $records = Db::table('wf_workflow_definition as t1')
                ->join('wf_workflow_transitions  as t2', 't1.id', 't2.workflow_id')
                ->join('wf_workflowsubmission_actions as t3', 't2.workflow_action_id', 't3.id')
                ->select('t3.*')
                ->where(array('t2.workflow_status_id' => $workflow_status_id, 't1.process_id' => $process_id))
                ->get();

            $res = array('success' => true, 'data' => $records);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }
    public function onApplicationProcessSubmission(Request $req)
    {
        try {
            //{"":4,"remarks":"Details","process_id":9,"":4,"":6,"":7,"":1,"":"","":10326,"":1,"":1}
            $table_name = $req->table_name;
            $user_id = $req->user_id;
            $app_reference_no = $req->app_reference_no;
            $process_id = $req->process_id;
            $workflow_id = $req->workflow_id;
            $prevworkflow_stage_id = $req->prevworkflow_stage_id;
            $nextworkflow_stage_id = $req->nextworkflow_stage_id;
            $workflow_status_id = $req->workflow_status_id;
            $user_to_id = $req->user_to_id;
            $application_code = $req->application_code;
            $remarks = $req->remarks;
            $transition_id = $req->id;
            $workflowstatus_action_id = $req->workflowstatus_action_id;
            //nextworkflow_status_id
            $submission_table_name = 'tra_applicationprocess_submissions';

            $transition_details = getTableData('wf_workflow_transitions', array('id' => $transition_id));
            $nextworkflow_status_id = $transition_details->nextworkflow_status_id;
            if (validateIsNumeric($process_id)) {
                $process_data = getTableData('wf_processes', array('id' => $process_id));
                $apptable_name = $process_data->table_name;
            } else {
                $process_data = getTableData('wf_workflow_definition', array('id' => $workflow_id));
                $process_id = $process_data->process_id;
                $process_data = getTableData('wf_processes', array('id' => $process_id));
                $apptable_name = $process_data->table_name;
            }

            $submission_actions = getTableData('wf_workflowsubmission_actions', array('id' => $workflowstatus_action_id));
            $workflow_actionstype_id = $submission_actions->workflow_actionstype_id;

            $app_details = getTableData($apptable_name, array('app_reference_no' => $app_reference_no));
            $app_reference_no = $app_details->app_reference_no;

            


            //check if there is an exiting record  nextworkflow_status_id app_reference_no
            $transition_data = array(
                'application_code' => $application_code,
                'current_stage_id' => $nextworkflow_stage_id,
                'previous_stage_id' => $prevworkflow_stage_id,
                'appworkflow_status_id' => $nextworkflow_status_id,
                'previous_user_id' => $user_id,
                'current_user_id' => $user_to_id,
                'isdone' => 0,
                'isread' => 0,
                'remarks' => $remarks,
                'date_received' => Carbon::now(),
                'process_id' => $process_id,
                'app_reference_no' => $app_reference_no,
                'workflowstatus_action_id' => $workflowstatus_action_id
            );
            $where_transition = array(
                'application_code' => $application_code,
                'current_stage_id' => $nextworkflow_stage_id,
                'previous_stage_id' => $prevworkflow_stage_id,
                'previous_user_id' => $user_id,
                'date_received' => Carbon::now(),
                'appworkflow_status_id' => $nextworkflow_status_id,
                'isdone' => 0
            );
            $record = DB::table('tra_applicationprocess_submissions')->where($where_transition)->get();
            if ($record->count() > 0) {
                if (recordExists($submission_table_name, $where_transition)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($submission_table_name, $where_transition);

                    $resp = updateRecord($submission_table_name, $previous_data['results'], $where_transition, $data, $user_id);
                }
            } else {
                $transition_data['created_on'] = Carbon::now();
                $transition_data['created_by'] = $user_id;

                $resp = insertRecord($submission_table_name, $transition_data, $user_id);

            }
            if ($resp['success']) {
                $where = array('application_code' => $application_code);
                $data = array('appworkflow_status_id' => $nextworkflow_status_id, 'submission_remarks' => $remarks);

                DB::table($apptable_name)->where($where)->update($data);
                //then close the previous submissions 
                funcUpdateCurrentSubmission($application_code, $prevworkflow_stage_id, $user_id);

                //then have the workflow_actions
                //provide the action_types 
                $this->funcWorkflowActionProcesses($application_code, $req, $workflow_actionstype_id, $user_id);

                $res = array(
                    'success' => true,
                    'message' => 'Application Submitted Successfully'
                );
                
            } else {
                $res = array(
                    'success' => false,
                    'error' => $resp,
                    'message' => 'Error Occurred Application submission failed'
                );
            }
            //update the application statuses

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }
    
    public function funcWorkflowActionProcesses($application_code, $req, $workflow_actionstype_id, $user_id)
    {
        $expertsprofile_information_id = 0;
        $email_address = '';
        $full_name = '';
        $expert_data = getTableData('exp_expertsprofile_information', array('user_information_id' => $user_id));
        // $app_reference_no = $app_details->app_reference_no;
        if ($expert_data) {
            $expertsprofile_information_id = $expert_data->id;

            $email_address = $expert_data->email_address;
            $full_name = $expert_data->first_name . ' ' . $expert_data->other_names . ' ' . $expert_data->surname;

        }

        switch ($workflow_actionstype_id) {
            case 1://Notify reviewer for tasks review

                break;
            case 2: //Notify experts on assignment
                //code block;
                break;
            case 3://Notify expert for task acceptance
                //code block
                $where_state = array(
                    'application_code' => $application_code,
                    'expertsprofile_information_id' => $expertsprofile_information_id
                );
                $assignment_data = array('assignments_status_id' => 3, 'altered_by' => $user_id, 'dola' => Carbon::now());
                DB::table('tra_workallocations_assignments')->where($where_state)->update($assignment_data);
                break;
            case 4://Notify experts for assignment rejection
                //code block
                break;
            case 5://Notify for 1st assessment Report submission
                //code block tra_workallocations_assignments
                $where_state = array(
                    'application_code' => $application_code,
                    'expertsprofile_information_id' => $expertsprofile_information_id
                );
                $assignment_data = array('assignments_status_id' => 3, 'assignment_end_date' => Carbon::now(), 'altered_by' => $user_id, 'dola' => Carbon::now());
                DB::table('tra_workallocations_assignments')->where($where_state)->update($assignment_data);

                break;
            case 6://Notify expert for quality assurance assignment
                //code block
                break;
            case 7://Notify expert for quality assurance acceptance
                //code block
                break;
            case 8://Notify for quality assurance report
                //code block
                break;
            default:
            //code block
        }

    }
    public function getProcessessFilteredUsers()
    {

    }
}
