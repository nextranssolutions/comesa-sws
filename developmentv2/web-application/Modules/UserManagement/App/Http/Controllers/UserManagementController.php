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
    
    public function onsaveUserGroupDetails(Request $req)
    {
        try {
            $user_id = $req->input("id");
            $loggedInUserId = $req->input('loggedInUserId');

            $user_resp = array('success'=>false, 'message'=>'No Record Saved');
			$user_groups_ids =$req->user_groups_ids;
            $record = Db::table('usr_users_information')
                ->where('id', '=', $user_id)
                ->count();
            if ($record > 0) {
                $table_name = 'tra_user_group';
                $user_resp = onFuncUserGroupUpdate($user_groups_ids,$user_id,$loggedInUserId);
                if ($user_resp['success']) {
                    $template_id = 5;
                    $subject = 'User Permissions Updates';
                    $vars = array(
                        '{user_name}' => $req->full_names,
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
                        // 'resp' => $resp,
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
            $user_id = $req->input("id");
            $loggedInUserId = $req->input("loggedInUserId");
            $appworkflow_status_id = 2;
            $user_groups_ids =$req->user_groups_ids;
            $record = DB::table('usr_users_information')
                ->where('id', '=', $user_id)
                ->count();
            if ($record > 0) {
                $table_name = 'usr_users_information';
                $full_names = $req->first_name . ' ' . $req->other_names;
                $user_data = array(
                    'account_type_id' => $req->account_type_id,
                    'user_title_id' => $req->user_title_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'member_state_id' => $req->member_state_id,
                    'institution_type_id' => $req->institution_type_id,
                    'email_address' => aes_encrypt($req->email_address),
                    'other_names' => aes_encrypt($req->other_names),
                    'first_name' => aes_encrypt($req->first_name),
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'identification_number' => $req->identification_number,
                    'organisation_id' => $req->organisation_id,
                    'organisation_department_id' => $req->organisation_department_id,
                    'identification_type_id' => $req->identification_type_id
                );
                $user_data['altered_by'] = $req->email_address;
                $user_data['dola'] = Carbon::now();

                $where = array('id' => $user_id);
                if (recordExists($table_name, $where)) {
                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');
                }
                if ($resp['success']) {

                    //update the User groups details 
                    $user_resp = onFuncUserGroupUpdate($user_groups_ids,$user_id,$loggedInUserId);
                   
                    $template_id = 5;
                    $subject = 'User Details Update';
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

    public function onUpdateTraderAccountDetails(Request $req)
    {
        try {
            // Validate request data
            $validatedData = $req->validate([
                'id' => 'required|integer',
                // 'identification_no' => 'required|string',
                'email_address' => 'required|email',
                'traderaccount_type_id' => 'nullable|integer',
                'contact_person' => 'nullable|string',
                'contact_person_email' => 'nullable|email',
                'contact_person_telephone' => 'nullable|string',
                'physical_address' => 'nullable|string',
                'postal_address' => 'nullable|string',
                'telephone_no' => 'nullable|string',
                'country_id' => 'nullable|integer',
                // 'region_id' => 'nullable|integer',
                // 'district_id' => 'nullable|integer',
                'name' => 'nullable|string',
                'mobile_no' => 'nullable|string',
            ]);

            $record_id = $req->input('id');
            $identification_no = $req->identification_no;
            $email_address = $req->email_address;

            // Default response
            $res = ['success' => false, 'message' => 'Trader information updated.'];

            // Check if record exists in the database
            $existingRecord = DB::table('tra_trader_account')
                // ->where('email_address', aes_encrypt($email_address))
                ->where('id', $record_id)
                ->exists();
            $userRecord = DB::table('usr_users_information')
                ->where('id', $record_id)
                ->exists();

            if ($existingRecord) {
                $table_name = 'tra_trader_account';

                // Prepare user data for update
                $trader_data = [
                    'traderaccount_type_id' => $req->traderaccount_type_id,
                    'contact_person' => $req->contact_person,
                    'contact_person_email' => $req->contact_person_email,
                    'contact_person_telephone' => $req->contact_person_telephone,
                    'physical_address' => $req->physical_address,
                    'postal_address' => $req->postal_address,
                    'telephone_no' => $req->telephone_no,
                    'country_id' => $req->country_id,
                    'region_id' => $req->region_id,
                    'district_id' => $req->district_id,
                    'name' => $req->name,
                    'mobile_no' => $req->mobile_no,
                    'email_address' => aes_encrypt($req->email_address), // Re-encrypt email
                    'altered_by' => $email_address,
                    'dola' => Carbon::now(),
                ];

                $where = ['id' => $record_id];

                // Check if the specific record exists
                if (recordExists($table_name, $where)) {
                    $previous_data = getPreviousRecords($table_name, $where);
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $trader_data, '');

                    if ($resp['success']) {
                        $table_name = 'usr_users_information';

                        // Update the user password directly
                        $user_data = array(
                            'is_initiateprofile_update' => 0,
                            'dola' => Carbon::now(),
                            'altered_by' => $email_address
                        );

                        $where = ['id' => $record_id];

                        // Check if the specific record exists
                        if (recordExists($table_name, $where)) {
                            $previous_data = getPreviousRecords($table_name, $where);
                            $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                            if ($resp['success']) {
                                $res = [
                                    'success' => true,
                                    'message' => 'The User Account has been updated.',
                                ];
                            } else {
                                $res = [
                                    'success' => false,
                                    'message' => 'Error occurred while updating the user account details.',
                                    'resp' => $resp,
                                ];
                            }
                        } else {
                            $res = [
                                'success' => false,
                                'message' => 'The specified record does not exist.',
                            ];
                        }
                    }

                    if ($resp['success']) {
                        $res = [
                            'success' => true,
                            'message' => 'The Trader Account has been updated.',
                        ];
                    } else {
                        $res = [
                            'success' => false,
                            'message' => 'Error occurred while updating the user account details.',
                            'resp' => $resp,
                        ];
                    }
                } else {
                    $res = [
                        'success' => false,
                        'message' => 'The specified record does not exist.',
                    ];
                }
            } else if ($existingRecord) {


            } else {
                $res = [
                    'success' => false,
                    'message' => 'No matching record found for the provided trader or email address.',
                ];
            }
        } catch (\Illuminate\Validation\ValidationException $validationException) {
            // Handle validation errors
            $res = [
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validationException->errors(),
            ];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }


    public function onTraderAccountRegistration(Request $req)
    {
        try {
            DB::beginTransaction(); // Start transaction

            $user_groups_ids =$req->user_groups_ids;
            $process_id = 1;
            $appworkflow_status_id = 1;
            $email_address = $req->email_address;
            $phone_number = $req->phone_number;
            $traderaccount_type_id = $req->traderaccount_type_id;
            $otp_value = $req->otp_value;

            $trader_no = generateUserRegistrationNo('tra_trader_account');

            $validator = Validator::make($req->all(), [
               
            ]);

            if ($validator->fails()) {
                return response()->json([
                   
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            }
            
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
            // **Step 1: Create Trader Account**
            $trader_account_data = [
                'traderaccount_type_id' => $req->traderaccount_type_id,
                'name' => $req->name,
                'contact_person' => $req->contact_person,
                'contact_person_email' => $req->contact_person_email,
                'country_id' => $req->country_id,
                'region_id' => $req->region_id,
                'district_id' => $req->district_id,
                'physical_address' => $req->physical_address,
                'postal_address' => $req->postal_address,
                'telephone_no' => $req->telephone_no,
                'mobile_no' => $req->mobile_no,
                'email_address' => $req->email_address,
                'status_id' => 1,
                'identification_no' => $trader_no,
                'created_by' => $req->email_address,
                'created_on' => now(),
            ];

            $trader_resp = insertRecord('tra_trader_account', $trader_account_data);

            if (!$trader_resp['success']) {
                throw new \Exception('Error creating trader account: ' . $trader_resp['message']);
            }

            $trader_id = $trader_resp['record_id'];

            // **Step 2: Create User Account**
            $generatedPassword = bin2hex(random_bytes(8));
            $application_code = generateApplicationCode($process_id, 'usr_users_information');
            $account_type_id = 1;
            $user_group_id = 2;
            // $email_address = aes_encrypt($req->email_address);
            $record = DB::table('usr_users_information')
                ->where('email_address', $email_address)
                // ->where('identification_number', '=', $req->identification_number)
                ->count();

            if ($record > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'There is an existing user account with the same Email Address, reset password or contact the System administrator.'
                ], 200);
            }
            $user_data = [
                'trader_id' => $trader_id,
                'account_type_id' => $account_type_id,
                'country_of_origin_id' => $req->country_of_origin_id,
                'email_address' => aes_encrypt($email_address),
                'password' => Hash::make($generatedPassword),
                'surname' => aes_encrypt($req->surname),
                'first_name' => aes_encrypt($req->first_name),
                'phone_number' => aes_encrypt($phone_number),
                'process_id' => $process_id,
                'appworkflow_status_id' => $appworkflow_status_id,
                'identification_number' => $req->identification_number,
                'application_code' => $application_code,
                'is_initiatepassword_change' => 1,
                'is_initiateprofile_update' => 1,
                'created_by' => $req->email_address,
                'created_on' => now(),
            ];

            $user_resp = insertRecord('usr_users_information', $user_data);

            if (!$user_resp['success']) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Error occurred: ' . $user_resp['message'],
                ], 200);
            } else {
                $appuser_id = $user_resp['record_id'];
                $group_id = 2;
                $usergroup_data = [
                    'group_id' => $group_id,
                    'user_id' => $appuser_id,
                ];

                $usergroup_resp = insertRecord('tra_user_group', $usergroup_data);
                if (!$usergroup_resp['success']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Error occurred: ' . $usergroup_resp['message'],
                    ], 200);
                }
            }
            $template_id = 1;
            $subject = 'Trader Account Creation Notification';
            $vars = [
                '{name}' => $req->name,
                '{email_address}' => $req->email_address,
                '{password}' => $generatedPassword,
                '{identification_no}' => $trader_no
            ];

            $mailResp = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
            if (!$mailResp['success']) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Account created, but email notification failed. Please contact support.'
                ], 500);
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Trader account created successfully. Login credentials have been emailed.'
            ], 200);

        } catch (\Exception $exception) {
            DB::rollBack(); // Rollback transaction on failure
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $exception->getMessage(),
            ], 500);
        }
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

    public function onCheckUserProfileUpdateDetails(Request $req)
    {
        try {
            $user_id = $req->user_id;
            $email_address = $req->email_address;
            //, 'email_address'=>aes_encrypt($req->email_address)
            $record = Db::table('usr_users_information')
                ->where(array('id' => $user_id))
                ->first();

            if ($record) {
                $is_initiateprofile_update = ($record->is_initiateprofile_update);
                $res = array(
                    'success' => true,
                    'message' => 'Kindly update your profile to proceed',
                    'is_initiateprofile_update' => $is_initiateprofile_update
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
                $subject = 'Password Reset Instructions';
                $template_id = 2;
                $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                if ($res['success']) {

                    //reset the user Password
                    $user_data = array(
                        'password' => Hash::make($generatedPassword),
                        'dola' => Carbon::now(),
                        'is_initiatepassword_change' => 1,
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
    public function onsaveUserRegistrationData(Request $req)
    {
        try {
            $user_id = $req->id;
            $process_id = 1;
            $account_type_id = $req->account_type_id;
            $email_address = $req->email_address;
            $user_groups_ids = $req->user_groups_ids;
            $loggedInUserId = $req->loggedInUserId;
            
            $telephone_n = $req->telephone_no;
            $phone_number = $req->phone_number;
            $validator = Validator::make($req->all(), [
                'user_title_id' => 'required|integer',
                'account_type_id' => 'required|integer',
                'country_of_origin_id' => 'required|integer',
                'member_state_id' => 'nullable|integer',
                'organisation_id' => 'nullable|integer',
                'organisation_department_id' => 'nullable|integer',
                'registration_number' => 'nullable|max:50',
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
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            }
            $user_data = [
                'account_roles_id' => $req->account_roles_id,
                'account_type_id' => $req->account_type_id,
                'country_of_origin_id' => $req->country_of_origin_id,
                'institution_type_id' => $req->institution_type_id,
                'user_title_id'=>$req->user_title_id,
                'email_address' => aes_encrypt($email_address),
                'surname' => aes_encrypt($req->surname),
                'first_name' => aes_encrypt($req->first_name),
                'other_names' => aes_encrypt($req->other_names),
                	
                'phone_number' => aes_encrypt($phone_number),
                'process_id' => $process_id,
                'identification_number' => $req->identification_number,
                'identification_type_id'=>$req->identification_type_id,
                'organisation_id' => $req->organisation_id,
                'organisation_department_id'=>$req->organisation_department_id,
            ];
            if (validateIsNumeric($req->id)) {

                $existingRecord = DB::table('usr_users_information')
                    ->where('id', '=', $req->id)
                    ->first();
                $user_id= $req->id;
                $user_data['dola']= Carbon::now();
                $user_data['altered_by'] =$loggedInUserId;

                $where = ['id' => $existingRecord->id];
                $table_name = 'usr_users_information';

                $previous_data = getPreviousRecords($table_name, $where);
                $previous_data = $previous_data['results'];

                $resp = updateRecord($table_name, $previous_data, $where, $user_data, '');
                if ($resp['success']) {
                    $user_resp = onFuncUserGroupUpdate($user_groups_ids,$user_id,$loggedInUserId);
                   
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

                    $user_data['created_on']= Carbon::now();
                     $user_data['created_by'] =$loggedInUserId;

                    $resp = insertRecord($table_name, $user_data);

                    if ($resp['success']) {
                        
                        $user_information_id = $resp['record_id'];
                        $user_resp = onFuncUserGroupUpdate($user_groups_ids,$user_information_id,$loggedInUserId);
                   
                        initiateInitialProcessSubmission($table_name, $application_code, $process_id, $user_information_id);

                        // $appuser_id = $user_resp['record_id'];
                        // $group_id = 2;
                        // $usergroup_data = [
                        //     'group_id' => $group_id,
                        //     'user_id' => $user_information_id,
                        // ];
                        
                        // $usergroup_resp = insertRecord('tra_user_group', $usergroup_data);
                        // if (!$usergroup_resp['success']) {
                        //     DB::rollBack();
                        //     return response()->json([
                        //         'success' => false,
                        //         'message' => 'Error occurred: ' . $usergroup_resp['message'],
                        //     ], 200);
                        // }


                        $template_id = 1;
                        $subject = 'Account Creation Notification';
                        // $account_type_name = DB::table('sys_account_types')
                        // ->where('id', $account_type_id)
                        // ->value('name');
                        $vars = [
                            '{user_name}' => $full_names,
                            '{email_address}' => $req->email_address,
                            '{user_password}' => $generatedPassword
                        ];
                        // $res = sendMailNotification($full_names, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
                        $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
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
                        'identification_type_id',
                        'country_of_origin_id',
                        'organisation_id',
                        'organisation_department_id',
                        'organisation_type_id',
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
                        'identification_number',
                        'process_id',
                        'appworkflow_status_id',
                        'created_on'
                    ])
                    ->where('id', $user_profile_id)
                    ->first();

                if ($record) {
                    $user_data = array(
                        'id' => $record->id,
                        'user_title_id' => $record->user_title_id,
                        'identification_type_id' => $record->identification_type_id,
                        'country_of_origin_id' => $record->country_of_origin_id,
                        'organisation_id' => $record->organisation_id,
                        'organisation_department_id' => $record->organisation_department_id,
                        'organisation_type_id' => $record->organisation_type_id,
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
                        
                        'identification_number' => $record->identification_number,
                         'process_id' => $record->process_id,
                        'appworkflow_status_id' => $record->appworkflow_status_id,
                        'created_on' => $record->created_on,
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
            
            $user_id = $req->user_id;

            $table_name = 'usr_users_information';
            $process_id = 1;
            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);
            //get the users details 
            $user_information = getTableData('usr_users_information', array('id' => $user_id));
            $account_type_id = $user_information->account_type_id;
            $organisation_id = $user_information->organisation_id;
            
            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_appworkflow_statuses as t2', 't2.id', 't1.appworkflow_status_id')
                ->leftJoin('sys_account_types as t3', 't3.id', 't1.account_type_id')
                ->leftJoin('usr_usersaccount_roles as t4', 't4.id', 't1.account_roles_id')
                ->leftJoin('usr_identification_type as t5', 't5.id', 't1.identification_type_id')
                ->leftJoin('tra_organisation_information as t6', 't6.id', 't1.organisation_id')
                ->leftJoin('par_organisation_departments as t7', 't7.id', 't1.organisation_department_id')
                ->leftJoin('par_countries as t8', 't8.id', 't1.country_of_origin_id')
                ->leftJoin('usr_users_title as t9', 't9.id', 't1.user_title_id')
                ->select('t1.*','t9.name as user_title','t6.name as organisation_name','t7.name as organisation_department', 't3.name as account_type','t4.name as account_role', 't5.name as identification_type',   't2.name as appworkflow_status');
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }
            $sql->where('t3.has_selfregistration', false);
            if($account_type_id != 2){
                //get only the specific organisation users 
                $sql->where('organisation_id', $organisation_id);
            }
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();

            foreach ($data as $rec) {
            
                $appworkflow_status_id = $rec->appworkflow_status_id;
                $qry = DB::table('tra_user_group')
						->where('user_id', $rec->id)
						->select('group_id');
					$user_groups = $qry->get();
                    $user_groups_ids = '';
					if($user_groups->count() >0){
						$user_groups = convertStdClassObjToArray($user_groups);
						$user_groups_ids = convertAssArrayToSimpleArray($user_groups, 'group_id');
						
					}
                $user_data[] = array(
                    'id' => $rec->id,
                    'user_groups_ids'=>$user_groups_ids,
                    'user_title_id' => $rec->user_title_id,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'identification_type_id' => $rec->identification_type_id,
                    'country_of_origin_id' => $rec->country_of_origin_id,
                    'organisation_id' => $rec->organisation_id,
                    'organisation_department_id' => $rec->organisation_department_id,
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
                    'identification_number' => $rec->identification_number,
                    'process_id' => $rec->process_id,
                    'date_registered'=>$rec->created_on,

                    
                    'organisation_name'=>$rec->organisation_name,
                    'organisation_department'=>$rec->organisation_department,
                    'account_type'=>$rec->account_type,
                    'account_role'=>$rec->account_role,

                    'identification_type'=>$rec->identification_type,
                    'user_title'=>$rec->user_title,
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

    public function onGetApiUserInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = 'usr_api_users';
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->select('t1.*');
            $data = $sql->get();
            foreach ($data as $rec) {

                $user_data[] = array(
                    'id' => $rec->id,
                    'apiuser_category_id' => $rec->apiuser_category_id,
                    'email' => $rec->email,
                    'username' => $rec->username,
                    'last_login_time' => $rec->last_login_time,
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

    public function onGetExternalUserInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = 'usr_external_users';
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->select('t1.*');
            $data = $sql->get();
            foreach ($data as $rec) {

                $user_data[] = array(
                    'id' => $rec->id,
                    'externaluser_category_id' => $rec->externaluser_category_id,
                    'email' => $rec->email,
                    'username' => $rec->username,
                    'phone' => $rec->phone,
                    'mobile' => $rec->mobile,
                    'last_login_time' => $rec->last_login_time,
                    'is_active' => $rec->is_active,
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

    public function onGetTraderInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $table_name = $req->table_name;
            $table_name = 'tra_trader_account';
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('par_trader_categories as t2', 't2.id', 't1.trader_category_id')
                ->leftJoin('par_traderaccount_types as t3', 't3.id', 't1.traderaccount_type_id')
                ->leftJoin('par_regions as t4', 't4.id', 't1.region_id')
                ->leftJoin('par_districts as t5', 't5.id', 't1.district_id')
                ->leftJoin('par_account_statuses as t6', 't6.id', 't1.status_id')
                ->leftJoin('par_countries as t7', 't7.id', 't1.country_id')
                ->select('t1.id as trader_id', 't1.*', 't2.name as trader_categories', 't3.name as traderaccount_types', 't4.name as regions', 't5.name as districts', 't6.name as status', 't7.name as country');
           
            $data = $sql->get();

            foreach ($data as $rec) {
               
                $user_data[] = array(
                    'id' => $rec->trader_id,
                    'country_id' => $rec->country_id,
                    'traderaccount_type_id' => $rec->traderaccount_type_id,
                    'trader_category_id' => $rec->trader_category_id,
                    'region_id' => $rec->region_id,
                    'district_id' => $rec->district_id,
                    'status_id' => $rec->status_id,

                    'country' => $rec->country,
                    'traderaccount_types' => $rec->traderaccount_types,
                    'trader_categories' => $rec->trader_categories,
                    'regions' => $rec->regions,
                    'districts' => $rec->districts,
                    'status' => $rec->status,

                    'email_address' => aes_decrypt($rec->email_address),
                    'name' => $rec->name,
                    'identification_no' => $rec->identification_no,
                    'mobile_no' => $rec->mobile_no,
                    'code_no' => $rec->code_no,
                    'telephone_no' => $rec->telephone_no,
                    'pacra_reg_no' => $rec->pacra_reg_no,
                    'tpin_no' => $rec->tpin_no,
                    'website' => $rec->website,
                    'fax' => $rec->fax,
                    'postal_address' => $rec->postal_address,
                    'physical_address' => $rec->physical_address,
                    'contact_person_telephone' => $rec->contact_person_telephone,
                    'contact_person_email' => $rec->contact_person_email,
                    'contact_person' => $rec->contact_person
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

    public function onGetTraderApplicationDetails(Request $req)
    {
        try {
            $user_data = null;
            $user_id = $req->user_id;

            // Validate user_id (ensure it's numeric)
            if (!$user_id || !filter_var($user_id, FILTER_VALIDATE_INT)) {
                return response()->json(['success' => false, 'message' => 'Invalid or missing user ID'], 400);
            }

            $record = DB::table('txn_importexport_applications as t1')
                ->leftJoin('tra_consignee_data as t2', 't2.id', '=', 't1.consignee_id')
                ->leftJoin('wf_workflow_stages as t3', 't3.id', '=', 't1.workflow_stage_id')
                ->leftJoin('usr_users_information as t4', 't4.id', '=', 't1.applicant_id')
                ->select([
                    't1.id',
                    't1.app_tracking_code',
                    't1.consignee_id',
                    't1.workflow_stage_id',
                    't1.application_code',
                    't1.applicant_id',
                    't1.process_id',
                    't1.created_on'
                ])
                ->where('t1.applicant_id', $user_id) // Ensure you filter by user
                ->first(); // Get only one record instead of a collection

            if ($record) {
                $user_data = [
                    'id' => $record->id,
                    'app_tracking_code' => $record->app_tracking_code,
                    'consignee_id' => $record->consignee_id,
                    'workflow_stage_id' => $record->workflow_stage_id,
                    'application_code' => $record->application_code,
                    'process_id' => $record->process_id,
                    'created_on' => $record->created_on,
                ];
            }

            return response()->json(['success' => true, 'data' => $user_data], 200);

        } catch (\Exception $exception) {
            return response()->json(sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__)), 500);
        } catch (\Throwable $throwable) {
            return response()->json(sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__)), 500);
        }
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

    public function onLoadPortalUserData(Request $req)
    {
        try {
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);

            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $check_exempt = DB::connection('portal')->table('ptl_exemptedpublic_tables')
                ->where(array('table_name' => $table_name))
                ->count();
            $sql = DB::connection('portal')->table($table_name . ' as t1');

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


    public function onsaveTraderData(Request $req)
    {
        DB::beginTransaction();

        try {
            // Generate a unique trader registration number
            $trader_no = generateUserRegistrationNo('tra_trader_account');
            $email_address = $req->email_address;
            $phone_number = $req->phone_number;
            $data = [
                'traderaccount_type_id' => $req->traderaccount_type_id,
                'name' => $req->name,
                'contact_person' => $req->contact_person,
                'contact_person_email' => $req->contact_person_email,
                'country_id' => $req->country_id,
                'region_id' => $req->region_id,
                'district_id' => $req->district_id,
                'physical_address' => $req->physical_address,
                'postal_address' => $req->postal_address,
                'telephone_no' => $req->telephone_no,
                'mobile_no' => $req->mobile_no,
                'email_address' => $req->email_address,
                'status_id' => 1,
                'identification_no' => $trader_no,
                'trader_category_id' => $req->trader_category_id,
                'country' => $req->country,
                'traderaccount_types' => $req->traderaccount_types,
                'trader_categories' => $req->trader_categories,
                'regions' => $req->regions,
                'districts' => $req->districts,
                'status' => $req->status,
                'code_no' => $req->code_no,
                'pacra_reg_no' => $req->pacra_reg_no,
                'tpin_no' => $req->tpin_no,
                'website' => $req->website,
                'fax' => $req->fax,
                'contact_person_telephone' => $req->contact_person_telephone,
            ];

            // Check if the email already exists
            $emailExists = DB::table('tra_trader_account')
                ->where('email_address', $req->email_address)
                ->exists();

            if ($emailExists) {
                DB::commit();
                return $this->onUpdateTraderData($req);
            } else {
                // Insert new trader account into 'tra_trader_account'
                $resp = insertRecord('tra_trader_account', $data, 'Create Trader Account');
                if (!$resp['success']) {
                    throw new \Exception('Failed to create trader account.');
                }
                $process_id = 1;
                $appworkflow_status_id = 1;
                $trader_id = $resp['record_id'];
                $generatedPassword = bin2hex(random_bytes(8));
                $application_code = generateApplicationCode($process_id, 'usr_users_information');
                $account_type_id = 1;
                $user_group_id = 2;

                $record = DB::table('usr_users_information')
                    ->where('email_address', $email_address)
                    // ->where('identification_number', '=', $req->identification_number)
                    ->count();

                if ($record > 0) {
                    return response()->json([
                        'success' => false,
                        'message' => 'There is an existing user account with the same Email Address, reset password or contact the System administrator.'
                    ], 200);
                }
                $user_data = [
                    'trader_id' => $trader_id,
                    'password' => aes_encrypt($generatedPassword),
                    'country_of_origin_id' => $req->country_id,
                    'account_type_id' => $account_type_id,
                    'user_group_id' => $user_group_id,
                    'email_address' => aes_encrypt($email_address),
                    'surname' => aes_encrypt($req->surname),
                    'first_name' => aes_encrypt($req->first_name),
                    'phone_number' => aes_encrypt($phone_number),
                    'process_id' => $process_id,
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'identification_number' => $req->identification_number,
                    'application_code' => $application_code,
                    'is_initiatepassword_change' => 1,
                    'is_initiateprofile_update' => 1,
                    'created_by' => $req->email_address,
                    'created_on' => now(),
                ];

                // Insert user details into 'usr_users_information'
                $userResp = insertRecord('usr_users_information', $user_data, '');
                if (!$userResp['success']) {
                    // print_r('User creation failed:', ['error' => $userResp['message']]);
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to create user.',
                        'error' => $userResp['message']
                    ], 500);
                }

                // Send email notification
                $template_id = 1;
                $subject = 'Applicant Account Creation Notification';
                $vars = [
                    '{name}' => $req->name,
                    '{email_address}' => $req->email_address,
                    '{password}' => $generatedPassword,
                    '{identification_no}' => $trader_no
                ];

                $mailResp = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                if (!$mailResp['success']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Account created, but email notification failed. Please contact support.'
                    ], 500);
                }

                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'Trader account created successfully. Login credentials have been emailed.'
                ], 200);
            }

        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json(sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__)), 500);
        } catch (\Throwable $throwable) {
            DB::rollBack();
            return response()->json(sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__)), 500);
        }
    }


    public function onUpdateTraderData(Request $req)
    {
        try {
            $record_id = $req->input("id");
            $email_address = $req->email_address;
            $trader_no = '';

            $validator = Validator::make($req->all(), [
                'country_id' => 'nullable|integer',
                'name' => 'nullable|string',
                'created_by' => 'nullable|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            }

            if (validateIsNumeric($req->id)) {
                $existingRecord = DB::table('tra_trader_account')->where('id', '=', $req->id)->first();

                $trader_data = [
                    'country_id' => $req->country_id,
                    'traderaccount_type_id' => $req->traderaccount_type_id,
                    'trader_category_id' => $req->trader_category_id,
                    'region_id' => $req->region_id,
                    'district_id' => $req->district_id,
                    'status_id' => $req->status_id,
                    'country' => $req->country,
                    'traderaccount_types' => $req->traderaccount_types,
                    'trader_categories' => $req->trader_categories,
                    'regions' => $req->regions,
                    'districts' => $req->districts,
                    'status' => $req->status,
                    'email_address' => $req->email_address,
                    'name' => $req->name,
                    'identification_no' => $req->identification_no,
                    'mobile_no' => $req->mobile_no,
                    'code_no' => $req->code_no,
                    'telephone_no' => $req->telephone_no,
                    'pacra_reg_no' => $req->pacra_reg_no,
                    'tpin_no' => $req->tpin_no,
                    'website' => $req->website,
                    'fax' => $req->fax,
                    'postal_address' => $req->postal_address,
                    'physical_address' => $req->physical_address,
                    'contact_person_telephone' => $req->contact_person_telephone,
                    'contact_person_email' => $req->contact_person_email,
                    'contact_person' => $req->contact_person,
                    'altered_by' => $req->email_address,
                    'dola' => now(),
                ];

                DB::beginTransaction();

                $where = ['id' => $existingRecord->id];
                $table_name = 'tra_trader_account';

                $previous_data = getPreviousRecords($table_name, $where);
                $previous_data = $previous_data['results'];

                $resp = updateRecord($table_name, $previous_data, $where, $trader_data, '');

                if ($resp['success']) {

                    $existingUserRecord = DB::table('usr_users_information')
                        ->where('email_address', '=', $req->email_address)
                        ->first();
                    if ($existingUserRecord) {
                        $resp = updateRecord($table_name, $previous_data, $where, $trader_data, '');

                        // Send email notification if needed
                        $template_id = 10;
                        $subject = 'Trader Account Update Notification';
                        $vars = [
                            '{name}' => $req->name,
                            '{email_address}' => $req->email_address,
                            '{identification_no}' => $trader_no,
                        ];

                        $mailResp = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                        if (!$mailResp['success']) {
                            DB::rollBack();
                            return response()->json([
                                'success' => false,
                                'message' => 'Account updated, but email notification failed. Please contact support.',
                            ], 500);
                        }
                    }

                    DB::commit();
                    return response()->json([
                        'success' => true,
                        'message' => 'Trader account updated successfully. Updated login credentials have been emailed.',
                    ], 200);
                }

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
                ->join('wf_appworkflow_statuses as t2', 't1.appworkflow_status_id', '=', 't2.id')
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
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
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
                $subject = 'Publication Information on CIMEX Guidelines for Regulatory Authorities';
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
    
    public function onGetUsersworkflowPermissionData(Request $req)
    {
        try {
            $user_id = $req->user_id;

            $records = DB::table('sys_user_workflowstagepermissions as t1')
                            ->join('wf_workflow_stages as t2', 't1.workflow_stage_id', 't2.id')
                            ->join('usr_users_accesslvls as t3', 't1.user_access_levels_id', 't3.id')
                            ->join('tra_user_group as t4', 't1.user_group_id', 't4.group_id')
                            ->join('wf_workflows as t5', 't2.workflow_id', 't5.id')
                            ->select('t1.*', 't5.name as wofkflow_name','t2.name as workflow_stage', 't3.name as user_access_levels' )
                            ->where('t4.user_id', $user_id)
                            ->get();
            $res = array('success' => true, 'data' => $records);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onGetappRegulatoryFunctionPermissionData(Request $req)
    {
        try {
            $user_id = $req->user_id;
            
            $records = DB::table('par_regulatoryfunctionaccess_groups as t1')
                            ->join('par_regulatory_functions as t2', 't1.regulatory_function_id', 't2.id')
                            ->join('usr_users_accesslvls as t3', 't1.user_access_levels_id', 't3.id')
                            ->join('tra_user_group as t4', 't1.user_group_id', 't4.group_id')
                            ->select('t1.*','t2.name as regulatory_function', 't3.name as user_access_levels' )
                            ->where('t4.user_id', $user_id)
                            ->get();
            $res = array('success' => true, 'data' => $records);


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onGetUsergroupInformation(Request $req)
    {
        try {
            $user_id = $req->user_id;
            $records = DB::table('tra_user_group as t1')
            ->join('usr_users_groups as t2', 't1.group_id', 't2.id')
            ->join('sys_account_types as t3', 't2.account_type_id', 't3.id')
            ->select('t1.*', 't2.name as user_groupname','t2.name as account_type' )
            ->where('t1.user_id', $user_id)
            ->get();
                $res = array('success' => true, 'data' => $records);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onGetappNavigationMenusPermisData(Request $req)
    {
        try {
            $user_id = $req->user_id;
            $records = DB::table('sys_usergroup_navpermissions as t1')
                            ->join('wf_navigation_items as t2', 't1.navigation_item_id', 't2.id')
                            ->join('usr_users_accesslvls as t3', 't1.user_access_levels_id', 't3.id')
                            ->join('tra_user_group as t4', 't1.user_group_id', 't4.group_id')
                            ->select('t1.*','t2.name as navigation_item', 't3.name as user_access_levels' )
                            ->where(array('level'=>0, 't4.user_id'=>$user_id))
                            ->get();
            $res = array('success' => true, 'data' => $records);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onGetMyCurrentTasksAssignments(Request $req)
    {
        try {
            $user_id = $req->user_id;
            $records = array();
            $res = array('success' => true, 'data' => $records);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    
}
