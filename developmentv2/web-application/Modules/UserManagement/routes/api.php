<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\UserManagement\App\Http\Controllers\UserManagementController;

/*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
*/

Route::middleware(['XssSanitizer', 'clear_cache_config', 'firewall.all'])->prefix('usermanagement')->group(function () {
    Route::post('onsaveUserData', [UserManagementController::class, 'onsaveUserData']);
    Route::post('onDeleteUserData', [UserManagementController::class, 'onDeleteUserData']);
    Route::post('onUserAccountRegistration', [UserManagementController::class, 'onUserAccountRegistration']);
    Route::post('onUserPasswordRequestRecovery', [UserManagementController::class, 'onUserPasswordRequestRecovery']);
    Route::post('onsaveUserGroupDetails', [UserManagementController::class, 'onsaveUserGroupDetails']);
    Route::post('onUserSubscriptionRequest', [UserManagementController::class, 'onUserSubscriptionRequest']);
    Route::post('onUserAccountApproval', [UserManagementController::class, 'onUserAccountApproval']);
    Route::post('onsaveTraderData', [UserManagementController::class, 'onsaveTraderData']);
    Route::post('onUserChangePassword', [UserManagementController::class, 'onUserChangePassword']);
    Route::post('onCheckUserPWDRequestDetails', [UserManagementController::class, 'onCheckUserPWDRequestDetails']);
    Route::post('onconfirmInitiateSelectionAndAppoitment', [UserManagementController::class, 'onconfirmInitiateSelectionAndAppoitment']);
    Route::post('onUpdateUserProfileInformation', [UserManagementController::class, 'onUpdateUserProfileInformation']);
    Route::post('onUserAccountRejection', [UserManagementController::class, 'onUserAccountRejection']);

    Route::get('onGetSingleUserProfileDetails', [UserManagementController::class, 'onGetSingleUserProfileDetails']);
    Route::get('onLoadPortalUserData', [UserManagementController::class, 'onLoadPortalUserData']);
    Route::get('onGetApiUserInformation', [UserManagementController::class, 'onGetApiUserInformation']);
    Route::get('onGetExternalUserInformation', [UserManagementController::class, 'onGetExternalUserInformation']);
    Route::get('onGetTraderApplicationDetails', [UserManagementController::class, 'onGetTraderApplicationDetails']);
    Route::get('onLoadUserData', [UserManagementController::class, 'onLoadUserData']);
    Route::get('onLoadUserAccountStatusCounters', [UserManagementController::class, 'onLoadUserAccountStatusCounters']);
    Route::get('onGetUserInformation', [UserManagementController::class, 'onGetUserInformation']);
    Route::get('onGetTraderInformation', [UserManagementController::class, 'onGetTraderInformation']);
});
