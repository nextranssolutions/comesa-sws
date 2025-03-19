<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\SysAdministration\App\Http\Controllers\SysAdministrationController;


Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('sysadministration')->group(function () {
    Route::get('onLoadSystemAdministrationData', [SysAdministrationController::class, 'onLoadSystemAdministrationData']);
    Route::get('onLoadTransactionProductRegistryDetails', [SysAdministrationController::class, 'onLoadTransactionProductRegistryDetails']);
    Route::get('onLoadTransactionRestrictionProhibitions', [SysAdministrationController::class, 'onLoadTransactionRestrictionProhibitions']);
    Route::get('onLoadTransactionEmailConfigurations', [SysAdministrationController::class, 'onLoadTransactionEmailConfigurations']);
    Route::get('onLoadTransactionPermitTypeData', [SysAdministrationController::class, 'onLoadTransactionPermitTypeData']);
    Route::get('onLoadNotificationScheduleConfigurations', [SysAdministrationController::class, 'onLoadNotificationScheduleConfigurations']);
    Route::get('onLoadTransactionPaymentIntegration', [SysAdministrationController::class, 'onLoadTransactionPaymentIntegration']);
    Route::get('getAppPermitSignatoriesData', [SysAdministrationController::class, 'getAppPermitSignatoriesData']);
    Route::get('getAppPermitSpecialConditions', [SysAdministrationController::class, 'getAppPermitSpecialConditions']);
    Route::get('getAdditionalFormFields', [SysAdministrationController::class, 'getAdditionalFormFields']);
    Route::get('getAppPermitChecklist', [SysAdministrationController::class, 'getAppPermitChecklist']);
    Route::get('getAppPermitRequiredDocuments', [SysAdministrationController::class, 'getAppPermitRequiredDocuments']);
    Route::post('onsaveSysAdminData', [SysAdministrationController::class, 'onSaveSystemAdministrationDetails']);
    Route::post('onsaveSysAdminUserData', [SysAdministrationController::class, 'onSaveSystemAdministrationUserDetails']);

    
	Route::post('onDeleteSystemAdministrationDetails', [SysAdministrationController::class, 'onDeleteSystemAdministrationDetails']);
    Route::post('onDeleteConfigData', [SysAdministrationController::class, 'onDeleteConfigData']);
    
    Route::post('onSaveNotSlidesInformation', [SysAdministrationController::class, 'onSaveNotSlidesInformation']);
    Route::post('onEnablePermitTypeDetails', [SysAdministrationController::class, 'onEnablePermitTypeDetails']);
  
    Route::get('getAppUserGroupNavigationMenus', [SysAdministrationController::class, 'getAppUserGroupNavigationMenus']);
    Route::get('getAppHscodes', [SysAdministrationController::class, 'getAppHscodes']);
    Route::get('getUserDetails', [SysAdministrationController::class, 'getUserDetails']);
    Route::get('onGetStartHsCode', [SysAdministrationController::class, 'onGetStartHsCode']);
    Route::get('onGetEndHsCode', [SysAdministrationController::class, 'onGetEndHsCode']);
    Route::get('onGetSpecificHsCode', [SysAdministrationController::class, 'onGetSpecificHsCode']);
    
    //Route::post('onSaveGroupNavPermissions',[SysAdministrationController::class,'onSaveGroupNavPermissions']);
    Route::post('onSavingUserNavigationPermissions', [SysAdministrationController::class, 'onSavingUserNavigationPermissions']);
    Route::post('onSaveSystemGuideline',[SysAdministrationController::class,'onSaveSystemGuideline']);
    Route::post('onSavingUserWorkflowPermissions', [SysAdministrationController::class, 'onSavingUserWorkflowPermissions']);

    Route::get('onLoadSystemGuideline', [SysAdministrationController::class, 'onLoadSystemGuideline']);
    Route::get('onLoadSystemManualGuidelines', [SysAdministrationController::class, 'onLoadSystemManualGuidelines']);
    Route::get('onLoadsystemGuidelinesProcesses', [SysAdministrationController::class, 'onLoadsystemGuidelinesProcesses']);
    Route::get('onLoadsystemGuidelinesFunctionaliites', [SysAdministrationController::class, 'onLoadsystemGuidelinesFunctionaliites']);

    Route::get('onLoadsystemSignInUpGuidelines', [SysAdministrationController::class, 'onLoadsystemSignInUpGuidelines']);
    Route::get('getAppUserGroupWorkflowPermission', [SysAdministrationController::class, 'getAppUserGroupWorkflowPermission']);
    Route::post('onSaveSignatories', [SysAdministrationController::class, 'onSaveSignatories']);
    Route::post('onSaveSystemAdminWithImage', [SysAdministrationController::class, 'onSaveSystemAdminWithImage']);
    Route::get('getAppUserGroupRegulatoryFunctions', [SysAdministrationController::class, 'getAppUserGroupRegulatoryFunctions']);
    Route::post('onSavingRegulatoryFunctionPermissions', [SysAdministrationController::class, 'onSavingRegulatoryFunctionPermissions']);

    Route::post('onSaveRegulatoryFunctionGuidelines', [SysAdministrationController::class, 'onSaveRegulatoryFunctionGuidelines']);
    Route::get('getAppUserGroupUsers', [SysAdministrationController::class, 'getAppUserGroupUsers']);

});
