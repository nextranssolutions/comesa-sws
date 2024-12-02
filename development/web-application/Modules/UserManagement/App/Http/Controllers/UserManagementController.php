<?php

namespace Modules\UserManagement\App\Http\Controllers;

use Modules\UserManagement\App\Models\ParUsers;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    // public function onsaveUserGroupDetails(Request $req)
    // {
    //     try {
    //         $record_id = $req->input("id");
    //         $appworkflow_status_id = 2;
    //         $record = Db::table('usr_users_information')
    //             ->where('email_address', '=', $record_id)
    //             ->count();

    //         if ($record > 0) {
    //             $table_name = 'usr_users_information';
    //             $full_names = $req->first_name . ' ' . $req->other_names;

    //             $user_data = array(
    //                 'account_type_id' => $req->account_type_id,
    //                 'account_group_id' => $req->account_group_id,
    //                 'user_title_id' => $req->user_title_id,
    //                 'country_of_origin_id' => $req->country_of_origin_id,
    //                 'member_state_id' => $req->member_state_id,
    //                 'institution_type_id' => $req->institution_type_id,
    //                 'email_address' => aes_encrypt($req->email_address),
    //                 'other_names' => aes_encrypt($req->other_names),
    //                 'first_name' => aes_encrypt($req->first_name),
    //                 'appworkflow_status_id' => $appworkflow_status_id,
    //                 'identification_number' => $req->identification_number,
    //                 'institution_id' => $req->institution_id,
    //                 'institution_department_id' => $req->institution_department_id,
    //                 'secretariat_department_id' => $req->secretariat_department_id,
    //                 'identification_type_id' => $req->identification_type_id
    //             );

    //             $user_data['altered_by'] = $req->email_address;
    //             $user_data['dola'] = Carbon::now();

    //             $where = array('id' => $record_id);
    //             if (recordExists($table_name, $where)) {

    //                 $previous_data = getPreviousRecords($table_name, $where);
    //                 $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

    //             }
    //             if ($resp['success']) {
    //                 $template_id = 5;
    //                 $subject = 'User Permissions & Approval';
    //                 $vars = array(
    //                     '{user_name}' => $full_names,
    //                     '{email_address}' => $req->email_address
    //                 );
    //                 $res = sendMailNotification($full_names, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

    //                 $res = array(
    //                     'success' => true,
    //                     'message' => 'The User Account has been Updated has been sent to you email.',

    //                 );
    //             } else {
    //                 $res = array(
    //                     'success' => false,
    //                     'resp' => $resp,
    //                     'message' => 'Error Occurred in updating the user Account Details.',

    //                 );
    //             }
    //         } else {
    //             $res = array(
    //                 'success' => false,
    //                 'message' => 'There is no existing user account with the same Email Address, contact the System administrator.'
    //             );

    //         }
    //     } catch (\Exception $exception) {
    //         $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     } catch (\Throwable $throwable) {
    //         $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     }
    //     return response()->json($res, 200);
    // }

    public function onsaveUserGroupDetails(Request $req)
    {
        try {
            $record_id = $req->input("id");
            $appworkflow_status_id = 2;
            $record = Db::table('usr_users_information')
                ->where('id', '=', $record_id)
                ->count();
            if ($record > 0) {
                $table_name = 'usr_users_information';
                $full_names = $req->first_name . ' ' . $req->other_names;

                $user_data = array(
                    
                    'account_type_id' => $req->account_type_id,
                    'account_group_id' => $req->account_group_id,
                    'user_title_id' => $req->user_title_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'partner_state_id' => $req->partner_state_id,
                    'institution_type_id' => $req->institution_type_id,
                    'email_address' => aes_encrypt($req->email_address),
                    'other_names' => aes_encrypt($req->other_names),
                    'first_name' => aes_encrypt($req->first_name),
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'identification_number' => $req->identification_number,
                    'institution_id' => $req->institution_id,
                    'institution_department_id' => $req->institution_department_id,
                    'secretariat_department_id' => $req->secretariat_department_id,
                    'identification_type_id' => $req->identification_type_id,
                    'user_group_id' => $req->user_group_id
                );

                $user_data['altered_by'] = $req->email_address;
                $user_data['dola'] = Carbon::now();

                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $previous_data = getPreviousRecords($table_name, $where);
                   
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                }
                if ($resp['success']) {
                    $template_id = 5;
                    $subject = 'User Permissions & Approval';
                    $vars = array(
                        '{user_name}' => $full_names,
                        '{email_address}' => $req->email_address
                    );
                    $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
                   

                    $res = array(
                        'success' => true,
                        'message' => 'The User Account has been Updated has been sent to you email.',

                    );
                } else {
                    $res = array(
                        'success' => false,
                        'resp' => $resp,
                        'message' => 'Error Occurred in updating the user Account Details.',

                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'There is no existing user account with the same Email Address, contact the System administrator.'
                );

            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }








    public function onUpdateUserProfileInformation(Request $req)
    {
        try {
            $record_id = $req->input("id");
            $appworkflow_status_id = 2;
            $record = DB::table('usr_users_information')
                ->where('id', '=', $record_id)
                ->count();
            if ($record > 0) {
                $table_name = 'usr_users_information';
                $full_names = $req->first_name . ' ' . $req->other_names;

                $user_data = array(
                    'account_type_id' => $req->account_type_id,
                    'account_group_id' => $req->account_group_id,
                    'user_title_id' => $req->user_title_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'member_state_id' => $req->member_state_id,
                    'institution_type_id' => $req->institution_type_id,
                    'email_address' => aes_encrypt($req->email_address),
                    'other_names' => aes_encrypt($req->other_names),
                    'first_name' => aes_encrypt($req->first_name),
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'identification_number' => $req->identification_number,
                    'institution_id' => $req->institution_id,
                    'institution_department_id' => $req->institution_department_id,
                    'secretariat_department_id' => $req->secretariat_department_id,
                    'identification_type_id' => $req->identification_type_id
                );
                $user_data['altered_by'] = $req->email_address;
                $user_data['dola'] = Carbon::now();

                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {
                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');
                }
                if ($resp['success']) {
                    $template_id = 5;
                    $subject = 'User Permissions & Approval';
                    $vars = array(
                        '{user_name}' => $full_names,
                        '{email_address}' => $req->email_address
                    );
                    $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                    $res = array(
                        'success' => true,
                        'message' => 'The User Account has been updated and account details has been sent to your email.',
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'resp' => $resp,
                        'message' => 'Error occurred in updating the account details.',
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'There is no existing user account with the same Email Address, contact System Administrator.'
                );
            }
        } catch (\Exception $exception) { 
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserAccountRegistration(Request $req)
    {
        DB::beginTransaction();
        $process_id = 1;
        $account_type_id = $req->account_type_id;
        $otp_value = $req->otp_value;
        try {
            $validator = Validator::make($req->all(), [
                'user_title_id' => 'required|integer',
                'account_type_id' => 'required|integer',
                'country_of_origin_id' => 'required|integer',
                'member_state_id' => 'nullable|integer',
                'institution_type_id' => 'nullable|integer',
                'institution_id' => 'nullable|integer',
                'organization_name' => 'nullable|string',
                'institution_department_id' => 'nullable|integer',
                'registration_number' => 'nullable|max:50',
                'secretariat_department_id' => 'nullable|integer',
                'identification_type_id' => 'nullable|integer',
                'identification_number' => 'nullable',
                'first_name' => 'required|string',
                'surname' => 'nullable|string',
                'other_names' => 'nullable|string',
                'email_address' => 'required|string|email:rfc,dns,spoof|indisposable',
                'phone_number' => 'nullable|string',

                'otp_value' => 'nullable|string',
                'created_by' => 'nullable|max:255',
                'created_on' => now()
            ]);

            // $appworkflow_status_id = 1;

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()->first(),
                ], 422);
            }

            $app_statusrecord = getInitialWorkflowStatusId($process_id);
            if (!$app_statusrecord) {

                return response()->json([
                    'success' => false,
                    'message' => 'The Initial Workflow Status Has not been set, contact the system admin',
                ], 200);
            }

            $appworkflow_status_id = $app_statusrecord->appworkflow_status_id;

            //OTP validation
            if ($otp_value) {
                $encryptedEmail = aes_encrypt($req->email_address);
                $otpRecord = DB::table('usr_onetimepwd_tokens')
                    ->where('email_address', '=', $encryptedEmail)
                    ->where('otp_value', '=', aes_encrypt($otp_value))
                    ->where('expiry_time', '>=', now()) // Check if OTP is not expired
                    ->first();
                if (!$otpRecord) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid or expired OTP. Please request a new OTP.',
                    ], 200);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'OTP is required.',
                ], 200);
            }
            $generatedPassword = bin2hex(random_bytes(8));

            $email_address = aes_encrypt($req->email_address);

            $record = DB::table('usr_users_information')
                ->where('email_address', $email_address)
                ->where('identification_number', '=', $req->identification_number)
                ->count();

            if ($record > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'There is an existing user account with the same Email Address, reset password or contact the System administrator.'
                ], 200);
            }


            // $telephone_no = $req->phone_number['internationalNumber'];
            $table_name = 'usr_users_information';
            $application_code = generateApplicationCode($process_id, $table_name);
            $full_names = trim($req->first_name . ' ' . $req->surname);

            $user_data = [
                'account_type_id' => $req->account_type_id,
                'user_title_id' => $req->user_title_id,
                'country_of_origin_id' => $req->country_of_origin_id,
                'institution_type_id' => $req->institution_type_id,
                'email_address' => $email_address,
                'password' => Hash::make($generatedPassword),
                'surname' => aes_encrypt($req->surname),
                'first_name' => aes_encrypt($req->first_name),
                'phone_number' => aes_encrypt($req->phone_number),
                'process_id' => $process_id,
                'appworkflow_status_id' => $appworkflow_status_id,
                'identification_number' => $req->identification_number,
                'institution_id' => $req->institution_id,
                'application_code' => $application_code,
                'institution_department_id' => $req->institution_department_id,
                'secretariat_department_id' => $req->secretariat_department_id,
                'identification_type_id' => $req->identification_type_id,
                'created_by' => $req->email_address,
                'is_initiatepassword_change'=>1,
                'created_on' => now(),
            ];

            $resp = insertRecord('usr_users_information', $user_data);

            if (!$resp['success']) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Error occurred: ' . $resp['message'],
                ], 200);
            }

            $user_information_id = $resp['record_id'];
            $experts_profile_no = '';

            if ($req->account_type_id == 1) {
                $process_id = 2;
                $exp_table = 'exp_expertsprofile_information';
                $experts_profile_no = generateUserRegistrationNo($exp_table);
                $application_code = generateApplicationCode($process_id, $exp_table);
                $app_reference_no = generateAppReferenceNo($process_id, $exp_table, $req->email_address);

                $app_statusrecord = getInitialWorkflowStatusId($process_id);
                if (!$app_statusrecord) {

                    return response()->json([
                        "process_id" => $process_id,
                        'success' => false,
                        'message' => 'The Initial Workflow Status Has not been set, contact the system admin',
                    ], 200);
                }

                $appworkflow_status_id = $app_statusrecord->appworkflow_status_id;

                $experts_profile = [
                    'user_information_id' => $user_information_id,
                    'app_reference_no' => $app_reference_no,
                    'experts_profile_no' => $experts_profile_no,
                    'process_id' => $process_id,
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'email_address' => $req->email_address,
                    'first_name' => $req->first_name,
                    'other_names' => $req->other_names,
                    'user_title_id' => $req->user_title_id,
                    'identification_type_id' => $req->identification_type_id,
                    'identification_number' => $req->identification_number,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'physical_address' => $req->physical_address,
                    // 'present_telephone_no' => $telephone_no,
                    'application_code' => $application_code,
                    'created_by' => $req->input('email_address'),
                    'created_on' => now(),
                ];

                $exp_resp = insertRecord($exp_table, $experts_profile);

                if (!$exp_resp['success']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Error occurred: ' . $exp_resp['message'],
                    ], 200);
                }
            }

            initiateInitialProcessSubmission('usr_users_information', $application_code, $process_id, $user_information_id);

            $template_id = 1;
            $subject = 'Account Creation Notification';
            $vars = [
                '{user_name}' => $full_names,
                '{email_address}' => $req->email_address,
                '{user_password}' => $generatedPassword,
                '{experts_profile_no}' => $experts_profile_no
            ];

            $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
            
            if (!$res['success']) {
                DB::rollBack();
                return response()->json([
                    'success' => true,
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'process_id' => $process_id,
                    'message' => 'Your account has been created successfully, unfortunately the email notification failed, try recreating the account or contact the system administrator.',
                ], 200);
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Your account has been created successfully, and the account credentials have been emailed to you.',
            ], 200);

        } catch (\Exception $exception) {
            DB::rollBack();
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onCheckUserPWDRequestDetails(Request $req)
    {
        try {
            $user_id = $req->user_id;
            $email_address = $req->email_address;
            //, 'email_address'=>aes_encrypt($req->email_address)
            $record = Db::table('usr_users_information')
                ->where(array('id' => $user_id))
                ->first();

            if ($record) {
                $is_initiatepassword_change = ($record->is_initiatepassword_change);
                $res = array(
                    'success' => true,
                    'message' => 'Kindly change your account Password to proceed',
                    'is_initiatepassword_change' => $is_initiatepassword_change
                );
            } else {
                $res = array('success' => false, 'message' => 'User Account Not found');

            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserChangePassword(Request $req)
    {
        try {
            $loggedInUserId = $req->user_id;
            $new_password = $req->new_password;
            $user_password = $req->password;
            $record = Db::table('usr_users_information')
                ->where('id', '=', $loggedInUserId)
                ->first();

            if ($record) {
                $email_address = ($record->email_address);

                if ($email_address != 'admin@gmail.com') {
                    // $email_address = aes_decrypt($email_address);
                }

                $user = ParUsers::where('email_address', $email_address)->first();

                if (!Hash::check($user_password, $user->password)) {
                    return response()->json(['success' => false, 'message' => 'The old password entered is incorrect. Please try again or reset your account password.'], 200);
                }

                $table_name = 'usr_users_information';
                $record_id = $record->id;

                // Update the user password directly
                $user_data = array(
                    'password' => Hash::make($new_password),
                    'is_initiatepassword_change' => 0,
                    'dola' => Carbon::now(),
                    'altered_by' => $email_address
                );
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {
                    $previous_data = getPreviousRecords($table_name, $where);
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                    $password_change = array(                  
                        'email_address' => $email_address,
                        'user_id' => $loggedInUserId,
                        'password_changedon' => Carbon::now(),
                        'ip_address' => $req->ip(), // Add the IP address here
                        'created_by' => $email_address,
                        'created_on' => Carbon::now()
                    );

                    $resp = insertRecord('aud_userpwdchangerequest_logs', $password_change);

                    if ($resp['success']) {
                        return response()->json([
                            'success' => true,
                            'message' => 'Your password has been successfully updated.'
                        ], 200);
                    } else {
                        return response()->json([
                            'success' => false,
                            'resp' => $resp,
                            'message' => 'Error occurred in updating the user account details.'
                        ], 200);
                    }
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'No user account associated with this email address exists. Please verify your email address or contact the system administrator for assistance.'
                    ], 404);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No user account associated with this email address exists. Please verify your email address or contact the system administrator for assistance.'
                ], 404);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserPasswordRequestRecovery(Request $req)
    {
        try {
            $email_address = $req->email_address;
            $userId = $req->userId;
            $record = Db::table('usr_users_information')
                ->where('email_address', '=', aes_encrypt($email_address))
                ->first();
            if ($record) {
                $full_names = aes_decrypt($record->first_name) . ' ' . aes_decrypt($record->other_names);
                $generatedPassword = bin2hex(random_bytes(8));
                $table_name = 'usr_users_information';
                $record_id = $record->id;
                $vars = array(
                    '{user_name}' => $full_names,
                    '{email_address}' => $email_address,
                    '{user_password}' => $generatedPassword
                );
                $subject = 'Password Reset Instructions - CONTINENTAL REGULATORY EXPERTS SOLUTION (E-CRES)';
                $template_id = 2;
                $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
                
                if ($res['success']) {

                    //reset the user Password
                    $user_data = array(
                        'password' => Hash::make($generatedPassword),
                        'dola' => Carbon::now(),
                        'is_initiatepassword_change'=>1,
                        'altered_by' => $email_address
                    );
                    $where = array('id' => $record_id);
                    if (recordExists($table_name, $where)) {

                        $previous_data = getPreviousRecords($table_name, $where);
                        $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                        $password_reset_logs = array(
      
                            'email_address' => $email_address,
                            'user_id' => $userId,
                            'requested_on' => Carbon::now(),
                            'ip_address' => $req->ip(), // Add the IP address here
                            // 'created_by' => $userId,
                            'created_on' => Carbon::now(),
                           
                        );
                        // $usr_loggedin_id = 0;
                        insertRecord('aud_userpwdresetrequest_logs', $password_reset_logs);

                    }
                    if ($resp['success']) {
                        $res = array(
                            'success' => true,
                            'message' => 'The reset password has been sent to you email.',

                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'resp' => $resp,
                            'message' => 'Error Occurred in updating the user Account Details.',

                        );
                    }
                    //
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Error in sending Email notification, please try again or contact the system administrator.',

                    );
                }


            } else {
                $res = array(
                    'success' => false,
                    'message' => 'No user account associated with this email address exists. Please verify your email address or contact the system administrator for assistance.'
                );

            }


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserAccountApproval(Request $req)
    {
        try {
            $email_address = $req->email_address;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $loggedInUserId = $req->loggedInUserId;
            $decision_description = $req->decision_description;
            $id = $req->id;
            $record = Db::table('usr_users_information')
                ->where(array('id' => $id))
                ->first();
            $name = '';
            if ($record) {
                $full_names = aes_decrypt($record->first_name) . ' ' . aes_decrypt($record->other_names);
                $generatedPassword = bin2hex(random_bytes(8));
                $table_name = 'usr_users_information';
                $record_id = $record->id;
                $vars = array(
                    '{user_name}' => $full_names,
                    '{email_address}' => $email_address
                );

                $subject = 'User Account Notification ' . $decision_description . ' of User Account';
                if ($appworkflow_status_id == 5) {
                    $template_id = 3;
                } else {
                    $template_id = 4;
                }

                $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
              
               
                if ($res['success']) {

                    //reset the user Password
                    $user_data = array(
                        'appworkflow_status_id' => $appworkflow_status_id,
                        'dola' => Carbon::now(),
                        'altered_by' => $loggedInUserId
                    );
                    $where = array('id' => $record_id);
                    if (recordExists($table_name, $where)) {

                        $previous_data = getPreviousRecords($table_name, $where);
                        $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                    }
                    if ($resp['success']) {
                        $res = array(
                            'success' => true,
                            'message' => 'The user account ' . $decision_description . ' has been effected successfully.',

                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'resp' => $resp,
                            'message' => 'Error Occurred in updating the user Account Details.',

                        );
                    }
                    //
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Error in sending Email notification, please try again or contact the system administrator.',

                    );
                }


            } else {
                $res = array(
                    'success' => false,
                    'message' => 'No user account associated with this email address exists. Please verify your email address or contact the system administrator for assistance.'
                );

            }


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserAccountRejection(Request $req)
    {
        try {
            // Extract parameters from the request
            $email_address = $req->email_address;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $loggedInUserId = $req->loggedInUserId;
            $id = $req->id;

            // Fetch user record from the database
            $record = DB::table('usr_users_information')
                ->where('id', $id)
                ->first();

            if ($record) {
                // decrypt user details
                $full_names = aes_decrypt($record->first_name) . ' ' . aes_decrypt($record->other_names);
            
                $vars = array(
                    '{user_name}' => $full_names,
                    '{email_address}' => $email_address
                );
            
            $subject = 'User Account Rejection Notification';

            $template_id = 4;

            $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

            if ($res['success']) {
                $user_data = array(
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'dola' => Carbon::now(),
                    'altered_by' => $loggedInUserId
                );
                $where = array('id' => $id);

                if (recordExists('usr_users_information', $where)) {
                    $previous_data = getPreviousRecords('usr_users_information', $where);
                    $resp = updateRecord('usr_users_information', $previous_data['results'], $where, $user_data, '');
                }

                if ($resp['success']) {
                    $res = array(
                        'success' => true,
                        'message' => 'The user account has been rejected and the user has been notified.',
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'resp' => $resp,
                        'message' => 'Error occured while updating the user account details.',
                    );
                }
                
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Error sending email notification. Please try again or contact the system administrator.',
                );
            } 
        } else {
            $res = array(
                'success' => false,
                'message' => 'No user account associated with this email address exists. Please verify the email address or contact the system administrator.',
            );
        }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }


    public function onconfirmInitiateSelectionAndAppoitment(Request $req)
    {
        try {
           
            $email_address = $req->email_address;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $loggedInUserId = $req->loggedInUserId;
            $id = $req->id;

          
            $record = DB::table('exp_expertsprofile_information')
                ->where('id', $id)
                ->first();

            if ($record) {
                
                $full_names = aes_decrypt($record->first_name) . ' ' . aes_decrypt($record->other_names);
            
                $vars = array(
                    '{user_name}' => $full_names,
                    '{email_address}' => $email_address
                );
            
            $subject = 'Selection and Appointment';

            $template_id = 10;

            $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
            // print_r($res);
            if ($res['success']) {
                $user_data = array(
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'dola' => Carbon::now(),
                    'altered_by' => $loggedInUserId
                );
                $where = array('id' => $id);

                if (recordExists('exp_expertsprofile_information', $where)) {
                    $previous_data = getPreviousRecords('exp_expertsprofile_information', $where);
                    $resp = updateRecord('exp_expertsprofile_information', $previous_data['results'], $where, $user_data, '');
                }

                if ($resp['success']) {
                    $res = array(
                        'success' => true,
                        'message' => 'The user account has been appointed and the user has been notified.',
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'resp' => $resp,
                        'message' => 'Error occured while updating the user account details.',
                    );
                }
                
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Error sending email notification. Please try again or contact the system administrator.',
                );
            } 
        } else {
            $res = array(
                'success' => false,
                'message' => 'No user account associated with this email address exists. Please verify the email address or contact the system administrator.',
            );
        }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }




    public function onsaveUserData(Request $req)
{
    try {
        $user_id = $req->id;
        $process_id = 1;
        $account_type_id = $req->account_type_id;
        $email_address = $req->email_address;
        
        // $telephone_no = $phone_number['internationalNumber'];
        $telephone_n = $req->telephone_no;
        $phone_number = $req->phone_number;
        $experts_profile_no = '';
        
        $validator = Validator::make($req->all(), [
            'user_title_id' => 'required|integer',
            'account_type_id' => 'required|integer',
            'country_of_origin_id' => 'required|integer',
            'member_state_id' => 'nullable|integer',
            'institution_type_id' => 'nullable|integer',
            'institution_id' => 'nullable|integer',
            'institution_department_id' => 'nullable|integer',
            'registration_number' => 'nullable|max:50',
            'secretariat_department_id' => 'nullable|integer',
            'identification_type_id' => 'required|integer',
            'identification_number' => 'required',
            'first_name' => 'required|string',
            'surname' => 'nullable|string',
            'email_address' => 'required|string|email:rfc,dns,spoof|indisposable',
            'created_by' => 'nullable|max:255',
            'created_on' => now()
        ]);
        $appworkflow_status_id = 1;

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
            ], 422);
        }

        // Check if a user with the given identification number already exists
        $existingRecord = DB::table('usr_users_information')
            ->where('identification_number', '=', $req->identification_number)
            ->first();

        // If the user exists, update their information
        if ($existingRecord) {
            $user_data = [
                'account_type_id' => $req->account_type_id,
                'user_title_id' => $req->user_title_id,
                'country_of_origin_id' => $req->country_of_origin_id,
                'institution_type_id' => $req->institution_type_id,
                'email_address' => aes_encrypt($email_address),
                'surname' => aes_encrypt($req->surname),
                'first_name' => aes_encrypt($req->first_name),
                'phone_number' => aes_encrypt($phone_number),
                'process_id' => $process_id,
                'identification_number' => $req->identification_number,
                'institution_id' => $req->institution_id,
                'altered_by' => $req->email_address,
                'dola' => now(), // Set the altered timestamp
            ];

            $where = ['id' => $existingRecord->id];
            $table_name = 'usr_users_information';

            $previous_data = getPreviousRecords($table_name, $where);
            $previous_data = $previous_data['results'];

            $resp = updateRecord($table_name, $previous_data, $where, $user_data, '');
            if ($resp['success']) {
                $res = [
                    'success' => true,
                    'message' => 'The account has been updated successfully.',
                ];
            } else {
                $res = [
                    'success' => false,
                    'message' => 'Error occurred while updating the user account information.',
                ];
            }
        } else {
            // If the user does not exist, create a new account
            $generatedPassword = bin2hex(random_bytes(8)); // 8 bytes = 16 characters in hex
            $table_name = 'usr_users_information';

            // Ensure no user with the same email exists
            $existingEmailRecord = DB::table('usr_users_information')
                ->where('email_address', '=', aes_encrypt($req->email_address))
                ->first();

            if (!$existingEmailRecord) {
                $application_code = generateApplicationCode($process_id, $table_name);

                $full_names = $req->first_name . ' ' . $req->other_names;

                $user_data = [
                    'account_type_id' => $req->account_type_id,
                    'user_title_id' => $req->user_title_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'institution_type_id' => $req->institution_type_id,
                    'email_address' => aes_encrypt($email_address),
                    'password' => Hash::make($generatedPassword),
                    'surname' => aes_encrypt($req->surname),
                    'first_name' => aes_encrypt($req->first_name),
                    'phone_number' => aes_encrypt($phone_number),
                    'process_id' => $process_id,
                    'is_initiatepassword_change' => 1,
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'identification_number' => $req->identification_number,
                    'institution_id' => $req->institution_id,
                    'application_code' => $application_code,
                    'institution_department_id' => $req->institution_department_id,
                    'secretariat_department_id' => $req->secretariat_department_id,
                    'identification_type_id' => $req->identification_type_id,
                    'created_by' => $req->email_address,
                    'created_on' => now(), // Set the created_on timestamp
                ];

                $resp = insertRecord($table_name, $user_data);

                if ($resp['success']) {
                    $exp_table = 'exp_expertsprofile_information';
                    $user_information_id = $resp['record_id'];
                    if ($account_type_id == 1) {
                        $experts_profile_no = generateUserRegistrationNo($exp_table);
                        $process_id = 2;
                        $appworkflow_status_id = 1;
                        $application_code = generateApplicationCode($process_id, $exp_table);
                        $app_reference_no = generateAppReferenceNo($process_id, $exp_table, $req->email_address);

                        $experts_profile = [
                            'user_information_id' => $user_information_id,
                            'app_reference_no' => $app_reference_no,
                            'experts_profile_no' => $experts_profile_no,
                            'process_id' => $process_id,
                            'appworkflow_status_id' => 1,
                            'email_address' => aes_encrypt($email_address),
                            'first_name' => aes_encrypt($req->first_name),
                            'other_names' => aes_encrypt($req->other_names),
                            'user_title_id' => $req->user_title_id,
                            'identification_type_id' => $req->identification_type_id,
                            'identification_number' => $req->identification_number,
                            'country_of_origin_id' => $req->country_of_origin_id,
                            'physical_address' => aes_encrypt($req->physical_address),
                            'present_telephone_no' => aes_encrypt($phone_number),
                            'application_code' => $application_code,
                            'created_by' => $req->email_address,
                            'created_on' => now(),
                        ];
                        $exp_resp = insertRecord($exp_table, $experts_profile);
                        if ($exp_resp['success']) {
                            $res = [
                                'success' => true,
                                'message' => 'Your expert profile has been created successfully.',
                            ];
                        }
                    }
                    initiateInitialProcessSubmission($table_name, $application_code, $process_id, $user_information_id);

                    $template_id = 1;
                    $subject = 'Account Creation Notification';

                    $vars = [
                        '{user_name}' => $full_names,
                        '{email_address}' => $req->email_address,
                        '{user_password}' => $generatedPassword,
                        '{experts_profile_no}' => $experts_profile_no
                    ];
                    $res = sendMailNotification($full_names, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
                    if ($res['success']) {
                        $res = [
                            'success' => true,
                            'message' => 'Your account has been created successfully, and the account credentials have been emailed to you.',
                        ];
                    } else {
                        $res = [
                            'success' => true,
                            'message' => 'Your account has been created successfully, but the email notification failed. Try recreating the account or contact the system administrator.',
                        ];
                    }
                } else {
                    $res = [
                        'success' => false,
                        'message' => 'Error occurred: ' . $resp['message'],
                    ];
                }
            } else {
                $res = [
                    'success' => false,
                    'message' => 'There is an existing user account with the same Email Address. Reset password or contact the System Administrator.'
                ];
            }
        }

    } catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    }
    return response()->json($res, 200);
}

    // public function onsaveUserData(Request $req)
    // {
    //     try {
    //         $user_id = $req->id;
    //         $process_id = 1;
    //         $account_type_id = $req->account_type_id;
    //         $email_address = $req->email_address;
    //         $phone_number = $req->phone_number;
    //         $telephone_no = $phone_number['internationalNumber'];
    //         $experts_profile_no = '';
            
    //         $validator = Validator::make($req->all(), [
    //             'user_title_id' => 'required|integer',
    //             'account_type_id' => 'required|integer',
    //             'country_of_origin_id' => 'required|integer',
    //             'member_state_id' => 'nullable|integer',
    //             'institution_type_id' => 'nullable|integer',
    //             'institution_id' => 'nullable|integer',
    //             'institution_department_id' => 'nullable|integer',
    //             'registration_number' => 'nullable|max:50',
    //             'secretariat_department_id' => 'nullable|integer',
    //             'identification_type_id' => 'required|integer',
    //             'identification_number' => 'required',
    //             'first_name' => 'required|string',
    //             'surname' => 'nullable|string',
    //             'email_address' => 'required|string|email:rfc,dns,spoof|indisposable',

    //             'created_by' => 'nullable|max:255',
    //             'created_on' => now()
    //         ]);
    //         $appworkflow_status_id = 1;

    //         if ($validator->fails()) {
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => $validator->errors()->first(),
    //             ], 422);
    //         }
    //         $existingRecord = DB::table('usr_users_information')
    //         ->where('identification_number', '=', $req->identification_number)
    //         ->exists();
    
    //         if ($existingRecord) {
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => 'The identification number already exists. Please provide a unique identification number.',
    //             ], 200);
    //         }

    //         if (validateIsNumeric($user_id)) {
    //             $user_data = [
    //                 'account_type_id' => $req->account_type_id,
    //                 'user_title_id' => $req->user_title_id,
    //                 'country_of_origin_id' => $req->country_of_origin_id,
    //                 'institution_type_id' => $req->institution_type_id,
    //                 'email_address' => aes_encrypt($req->email_address),
    //                 'surname' => aes_encrypt($req->surname),
    //                 'first_name' => aes_encrypt($req->first_name),
    //                 'phone_number' => aes_encrypt($telephone_no),
    //                 'process_id' => $process_id,
    //                 // 'appworkflow_status_id' => $appworkflow_status_id,
    //                 'identification_number' => $req->identification_number,
    //                 'institution_id' => $req->institution_id,
    //                 'altered_by' => $req->email_address,
    //                 'dola' => now(), // Manually set the altered timestamp
    //             ];

    //             $where = ['id' => $user_id];
    //             $table_name = 'usr_users_information';
                
    //             if (recordExists($table_name, $where)) {
    //                 $previous_data = getPreviousRecords($table_name, $where);
    //                 $previous_data = $previous_data['results'];
    
    //                 $resp = updateRecord($table_name, $previous_data, $where, $user_data, '');
    //                 if ($resp['success']) {
    //                     $res = [
    //                         'success' => true,
    //                         'message' => 'The account has been updated successfully.',
    //                     ];
    //                 } else {
    //                     $res = [
    //                         'success' => false,
    //                         'message' => 'Error occurred while updating the user account information.',
    //                     ];
    //                 }
    //             } else {
    //                 $res = [
    //                     'success' => false,
    //                     'message' => 'User Information Not found',
    //                 ];
    //             }

    //         } else {
    //             $generatedPassword = bin2hex(random_bytes(8)); // 8 bytes = 16 characters in hex
    //             //validate if there exists user email
    //             $record = Db::table('usr_users_information')
    //                 ->where('email_address', '=', aes_encrypt($req->email_address))
    //                 ->count();
    //             if ($record == 0) {
    //                 $table_name = 'usr_users_information';
    
    //                 $generatedPassword = bin2hex(random_bytes(8));
    //                 $application_code = generateApplicationCode($process_id, $table_name);
    
    //                 $full_names = $req->first_name . ' ' . $req->other_names;
    
    //                 $user_data = array(
    //                     'account_type_id' => $req->account_type_id,
    //                     'user_title_id' => $req->user_title_id,
    //                     'country_of_origin_id' => $req->country_of_origin_id,
    //                     'institution_type_id' => $req->institution_type_id,
    //                     'email_address' => aes_encrypt($req->email_address),
    //                     'password' => Hash::make($generatedPassword),
    //                     'surname' => aes_encrypt($req->surname),
    //                     'first_name' => aes_encrypt($req->first_name),
    //                     'phone_number' => aes_encrypt($telephone_no),
    //                     'process_id' => $process_id,
    //                     'is_initiatepassword_change'=>1,
    //                     'appworkflow_status_id' => $appworkflow_status_id,
    //                     'identification_number' => $req->identification_number,
    //                     'institution_id' => $req->institution_id,
    //                     'application_code' => $application_code,
    //                     'institution_department_id' => $req->institution_department_id,
    //                     'secretariat_department_id' => $req->secretariat_department_id,
    //                     'identification_type_id' => $req->identification_type_id,
    //                     'created_by' => $req->input('email_address'),
    //                     'created_on' => now(), // Manually set the created_on timestamp
    //                 );
    
    //                 $user_data['created_by'] = $req->email_address;
    //                 $user_data['created_on'] = Carbon::now();
    
    //                 $resp = insertRecord($table_name, $user_data);
    
    //                 if ($resp['success']) {
    //                     $exp_table = 'exp_expertsprofile_information';
    //                     $user_information_id = $resp['record_id'];
    //                     if ($account_type_id == 1) {
    //                         $experts_profile_no = generateUserRegistrationNo($exp_table);
    //                         $process_id = 2;
    //                         $appworkflow_status_id = 1;
    //                         $email_address = '';
    //                         $first_name = $req->first_name;
    //                         $other_names = $req->other_names;
    //                         $application_code = generateApplicationCode($process_id, $exp_table);
    //                         $app_reference_no = generateAppReferenceNo($process_id, $exp_table, $req->email_address);
    
    //                         $experts_profile = array(
    //                             'user_information_id' => $user_information_id,
    //                             'app_reference_no' => $app_reference_no,
    //                             'experts_profile_no' => $experts_profile_no,
    //                             'process_id' => $process_id,
    //                             'appworkflow_status_id' => 1,
    //                             'email_address' => $email_address,
    //                             'first_name' => $first_name,
    //                             'other_names' => $other_names,
    //                             'user_title_id' => $req->user_title_id,
    //                             'identification_type_id' => $req->identification_type_id,
    //                             'identification_number' => $req->identification_number,
    //                             'country_of_origin_id' => $req->country_of_origin_id,
    //                             'physical_address' => $req->physical_address,
    //                             'present_telephone_no' => $telephone_no,
    //                             'application_code' => $application_code,
    //                             'created_by' => $req->input('email_address'),
    //                             'created_on' => now(),
    //                         );
    //                         $exp_resp = insertRecord($exp_table, $experts_profile);
    //                         if ($exp_resp['success']) {
    //                             $exp_resp = array(
    //                                 'success' => true,
    //                                 'message' => 'Your expert profile has been created successfully.',
    
    //                             );
    //                         }
    //                     }
    //                     initiateInitialProcessSubmission($table_name, $application_code, $process_id, $user_information_id);
    
    //                     $template_id = 1;
    //                     $subject = 'Account Creation Notification';
    
    //                     $vars = array(
    //                         '{user_name}' => $full_names,
    //                         '{email_address}' => $req->email_address,
    //                         '{user_password}' => $generatedPassword,
    //                         '{experts_profile_no}' => $experts_profile_no
    //                     );
    //                     $res = sendMailNotification($full_names, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
    //                     if ($res['success']) {
    //                         $res = array(
    //                             'success' => true,
    //                             'message' => 'Your account has been created successfully, and the account credentials have been emailed to you.',
    
    //                         );
    //                     } else {
    //                         $res = array(
    //                             'success' => true,
    //                             'message' => 'Your account has been created successfully, unfortunately the email notification failed, try recreating the Acocunt or contact the system administrator.',
    
    //                         );
    //                     }
    
    //                 } else {
    //                     $res = array(
    //                         'success' => false,
    //                         'message' => 'Error occurred: ' . $resp['message'],
    
    //                     );
    //                 }
    //             } else {
    //                 $res = array(
    //                     'success' => false,
    //                     'message' => 'There is an existing user account with the same Email Address, reset password of contact the System administrator.'
    //                 );
    
    //             }
    //         }

    //     } catch (\Exception $exception) {
    //         $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     } catch (\Throwable $throwable) {
    //         $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     }
    //     return response()->json($res, 200);
    // }

    public function onGetSingleUserProfileDetails(Request $req)
    {
        try {
            $user_data = array();
            $user_profile_id = $req->user_profile_id;
            $table_name = 'usr_users_information';

            if (validateIsNumeric($user_profile_id)) {
                $record = DB::table($table_name)
                    ->select([
                        'id',
                        'user_title_id',
                        'user_group_id',
                        'identification_type_id',
                        'country_of_origin_id',
                        'institution_id',
                        'institution_department_id',
                        'user_status',
                        'email_address',
                        'first_name',
                        'surname',
                        'phone_number',
                        'workflow_status_id',
                        'account_roles_id',
                        'last_login_time',
                        'is_verified',
                        'account_type_id',
                        'application_code',
                        'account_registration_no',
                        'member_state_id',
                        'identification_number',
                        'secretariat_department_id',
                        'process_id',
                        'appworkflow_status_id'
                    ])
                    ->where('id', $user_profile_id)
                    ->first();

                if ($record) {
                    $user_data = array(
                        'id' => $record->id,
                        'user_title_id' => $record->user_title_id,
                        'user_group_id' => $record->user_group_id,
                        'identification_type_id' => $record->identification_type_id,
                        'country_of_origin_id' => $record->country_of_origin_id,
                        'institution_id' => $record->institution_id,
                        'institution_department_id' => $record->institution_department_id,
                        'user_status' => $record->user_status,
                        'email_address' => aes_decrypt($record->email_address),
                        'first_name' => aes_decrypt($record->first_name),
                        'surname' => aes_decrypt($record->surname),
                        'phone_number' => aes_decrypt($record->phone_number),
                        'workflow_status_id' => $record->workflow_status_id,
                        'account_roles_id' => $record->account_roles_id,
                        'last_login_time' => $record->last_login_time,
                        'is_verified' => $record->is_verified,
                        'account_type_id' => $record->account_type_id,
                        'application_code' => $record->application_code,
                        'account_registration_no' => $record->account_registration_no,
                        'member_state_id' => $record->member_state_id,
                        'identification_number' => $record->identification_number,
                        'secretariat_department_id' => $record->secretariat_department_id,
                        'process_id' => $record->process_id,
                        'appworkflow_status_id' => $record->appworkflow_status_id,
                    );
                }
            }

            $res = array('success' => true, 'data' => $user_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }




    public function onGetUserInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $phone_number = $req->phone_number;
            $user_group_id = $req->user_group_id;
            $table_name = 'usr_users_information';
            $process_id = 1;
            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_workflow_statuses as t2', 't2.id', 't1.appworkflow_status_id')
                ->select('t1.*', 't2.name as appworkflow_status');
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }

            if (validateIsNumeric($user_group_id)) {
                $sql->where('user_group_id', $user_group_id);
            }
            
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();
          
            foreach ($data as $rec) {
                if ($rec->appworkflow_status_id == 2) {
                    $appworkflow_status_id = 6;
                } else {

                    $appworkflow_status_id = $rec->appworkflow_status_id;
                }

                $user_data[] = array(
                    'id' => $rec->id,
                    'user_title_id' => $rec->user_title_id,
                    'user_group_id' => $rec->user_group_id,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'identification_type_id' => $rec->identification_type_id,
                    'country_of_origin_id' => $rec->country_of_origin_id,
                    'institution_id' => $rec->institution_id,
                    'institution_department_id' => $rec->institution_department_id,
                    'user_status' => $rec->user_status,
                    'email_address' => aes_decrypt($rec->email_address),
                    'first_name' => aes_decrypt($rec->first_name),
                    'surname' => aes_decrypt($rec->surname),
                    'phone_number' => aes_decrypt($rec->phone_number),
                    'workflow_status_id' => $rec->workflow_status_id,
                    'account_roles_id' => $rec->account_roles_id,
                    'last_login_time' => $rec->last_login_time,
                    'is_verified' => $rec->is_verified,
                    'account_type_id' => $rec->account_type_id,
                    'application_code' => $rec->application_code,
                    'account_registration_no' => $rec->account_registration_no,
                    'member_state_id' => $rec->member_state_id,
                    'identification_number' => $rec->identification_number,
                    'secretariat_department_id' => $rec->secretariat_department_id,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );


            }
            $res = array('success' => true, 'data' => $user_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onGetExpertInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $user_group_id = $req->user_group_id;
            $table_name = 'exp_expertsprofile_information';
            $process_id = 1;
            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_workflow_statuses as t2', 't2.id', 't1.appworkflow_status_id')
                ->select('t1.*', 't2.name as appworkflow_status');
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }

            if (validateIsNumeric($user_group_id)) {
                $sql->where('user_group_id', $user_group_id);
            }
            
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();
          
            foreach ($data as $rec) {
                if ($rec->appworkflow_status_id == 2) {
                    $appworkflow_status_id = 6;
                } else {

                    $appworkflow_status_id = $rec->appworkflow_status_id;
                }

                $user_data[] = array(
                    'id' => $rec->id,
                    'user_title_id' => $rec->user_title_id,
                    // 'user_group_id' => $rec->user_group_id,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'identification_type_id' => $rec->identification_type_id,
                    'country_of_origin_id' => $rec->country_of_origin_id,
                    'institution_id' => $rec->institution_id,
                    // 'institution_department_id' => $rec->institution_department_id,
                    // 'user_status' => $rec->user_status,
                    'email_address' => aes_decrypt($rec->email_address),
                    'first_name' => aes_decrypt($rec->first_name),
                    'surname' => aes_decrypt($rec->surname),
                    // 'phone_number' => aes_decrypt($rec->phone_number),
                    // 'workflow_status_id' => $rec->workflow_status_id,
                    // 'account_roles_id' => $rec->account_roles_id,
                    // 'last_login_time' => $rec->last_login_time,
                    // 'is_verified' => $rec->is_verified,
                    // 'account_type_id' => $rec->account_type_id,
                    'application_code' => $rec->application_code,
                    // 'account_registration_no' => $rec->account_registration_no,
                    // 'member_state_id' => $rec->member_state_id,
                    'identification_number' => $rec->identification_number,
                    // 'secretariat_department_id' => $rec->secretariat_department_id,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );


            }
            $res = array('success' => true, 'data' => $user_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onLoadUserData(Request $req)
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
            //,'contextMenu' => returnActionColumn($rec->application_status_id, $actionColumnData)
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onDeleteUserData(Request $req)
    {
        try {
            $record_id = $req->record_id;
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
                $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state, $user_id);
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
    public function onLoadUserAccountStatusCounters(Request $req)
    {
        try {
            // account_type_id: account_type_id,member_state_id:member_state_id
            $account_type_id = $req->account_type_id;
            $member_state_id = $req->member_state_id;


            $records = DB::table('usr_users_information as t1')
                ->join('wf_workflow_statuses as t2', 't1.appworkflow_status_id', '=', 't2.id')
                ->select(DB::raw("t1.appworkflow_status_id, t2.name as user_statusname, count(t1.id) as statuses_counter"));
            if (validateIsNumeric($account_type_id)) {
                $account_types = getTableData('sys_account_types', array('id' => $account_type_id));
                $has_memberstate_defination = $account_types->has_memberstate_defination;
                if ($has_memberstate_defination) {
                    $records = $records->where("member_state_id", $member_state_id);
                }
            }

            $records = $records->groupBy('t1.appworkflow_status_id', 't2.name')->get();
            $res = array('success' => true, 'data' => $records);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);

    }

    public function onUserSubscriptionRequest(Request $req)
    {
        try {
            $process_id = 1;
            $email_address = $req->email_address;

            $publications_type_id = $req->publications_type_id;

            $validator = Validator::make($req->all(), [
                // 'publications_types_id' => 'integer',
                //'publications_informations_id' => 'integer',
                'email_address' => 'required|string|email:rfc,dns,spoof|indisposable',
                'created_by' => 'nullable|max:255',
                'created_on' => now(), // Manually set the created_on timestamp
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()->first(),
                ], 422);
            }
            $table_name = 'tra_subscription_registration';
            $where = array('email_address' => $email_address);

            if (recordExists($table_name, $where)) {
                $user_data = array(

                    'altered_by' => $req->input('email_address'),
                    'dola' => now(),
                );
                $previous_data = getPreviousRecords($table_name, $where);
                $previous_data = $previous_data['results'];


                $resp = updateRecord($table_name, $previous_data, $where, $user_data, '');

            } else {
                $application_code = generateApplicationCode($process_id, $table_name);

                $user_data = array(
                    'email_address' => aes_encrypt($req->email_address),
                    // 'publications_types_id' => $req->publication_types,
                    //'publications_informations_id' => $req->publication_information,
                    'application_code' => $application_code,
                    'process_id' => $process_id,
                    'created_by' => $req->input('email_address'),
                    'created_on' => now(),
                );

                $resp = insertRecord($table_name, $user_data);


            }

            if ($resp['success']) {

                $subscription_registration_id = $resp['record_id'];
                foreach ($publications_type_id as $record) {
                    $tabl_name = 'tra_subscriptionsregistration_types';
                    $data = array('subscription_registration_id' => $subscription_registration_id, 'publications_type_id' => $record);
                    if (!recordExists($tabl_name, $data)) {
                        $data['created_on'] = now();
                        $data['created_by'] = $req->input('email_address');
                        insertRecord($tabl_name, $data);

                    }

                }
                //insertion of the publication items

                $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id, $subscription_registration_id);

                $template_id = 8;
                $subject = 'Publication Information on ECRES Guidelines for Regulatory Authorities';
                $vars = array(
                    '{email_address}' => $req->email_address,
                    // '{publication_types_id}' => $req->publication_types_id,
                    '{publication_information}' => $req->publication_information,
                );
                $res = sendMailNotification($req->publication_types, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                if ($res) {
                    $res = array(
                        'success' => true,
                        'message' => 'Subscription success'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Your account has been created successfully, unfortunately the email notification failed. Please contact the system administrator.',
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Error occurred: ' . $resp['message'],
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
