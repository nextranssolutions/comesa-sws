<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Configurations\App\Http\Controllers\ConfigurationsController;

//index.php/api/configuration/getUserNavigationItems
Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('configurations')->group(function () {
    Route::get('funcFetchPublicDetailsCounter', [ConfigurationsController::class, 'funcFetchPublicDetailsCounter']);
	Route::get('getUserNavigationItems', [ConfigurationsController::class, 'getUserNavigationItems']);
    Route::get('onLoadConfigurationData', [ConfigurationsController::class, 'onLoadConfigurationData']);
    Route::get('onLoadUserOrganisationData', [ConfigurationsController::class, 'onLoadUserOrganisationData']);
    Route::get('onLoadDocumentRequriementrecords', [ConfigurationsController::class, 'onLoadDocumentRequriementrecords']);
    
    
    Route::get('onLoadTranslationManagement', [ConfigurationsController::class, 'onLoadTranslationManagement']);
    Route::get('onLoadInformationSharingConfig', [ConfigurationsController::class, 'onLoadInformationSharingConfig']);
    
    Route::post('onEnableConfigurationsDetails', [ConfigurationsController::class, 'onEnableConfigurationsDetails']);
    Route::post('onSavingLanguageTranslationManagement', [ConfigurationsController::class, 'onSavingLanguageTranslationManagement']);
    Route::post('onsaveConfigData', [ConfigurationsController::class, 'onsaveConfigData']);
    Route::post('onSaveDocumentRequirements', [ConfigurationsController::class, 'onSaveDocumentRequirements']);
	
    
    Route::post('onDeleteConfigData', [ConfigurationsController::class, 'onDeleteConfigData']);
    Route::post('onDeleteWorkflowsDetails', [ConfigurationsController::class, 'onDeleteConfigData']);
    Route::post('onDeleteConfigurationsDetails', [ConfigurationsController::class, 'onDeleteConfigurationsDetails']);

    Route::get('onLoadRegulatoryFunctions', [ConfigurationsController::class, 'onLoadRegulatoryFunctions']);
	Route::get('onLoadApplicationtablsList', [ConfigurationsController::class, 'onLoadApplicationtablsList']);
	Route::get('getAppRegulatoryFunctionFeeConfig', [ConfigurationsController::class, 'getAppRegulatoryFunctionFeeConfig']);
    Route::get('getFeesChargesConfigurations', [ConfigurationsController::class, 'getFeesChargesConfigurations']);
    Route::get('getUniformSectionApplicationProcess', [ConfigurationsController::class, 'getUniformSectionApplicationProcess']);
    Route::get('getApplicantUniformApplicationProces', [ConfigurationsController::class, 'getApplicantUniformApplicationProces']);

    Route::get('getPermitUniformApplicationProces', [ConfigurationsController::class, 'getPermitUniformApplicationProces']);
    Route::get('getTransactionPermitTypeData', [ConfigurationsController::class, 'getTransactionPermitTypeData']);
    
    
    //fetInforamtion get.....
    //save information save....
    //delete onDelete....  
});
