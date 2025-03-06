<?php

use Illuminate\Support\Facades\Route;
use Modules\RevenueManagement\App\Http\Controllers\RevenueManagementController;

Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('revenuemanagement')->group(function () {
   
    Route::get('onLoadConfigurationData', [RevenueManagementController::class, 'onLoadConfigurationData']);
    Route::post('onsaveConfigData', [RevenueManagementController::class, 'onsaveConfigData']);
    Route::post('onEnableConfigurationsDetails', [RevenueManagementController::class, 'onEnableConfigurationsDetails']);
    Route::get('getAppRegulatoryFunctionFeeConfig', [RevenueManagementController::class, 'getAppRegulatoryFunctionFeeConfig']);
    Route::get('getFeesChargesConfigurations', [RevenueManagementController::class, 'getFeesChargesConfigurations']);
    Route::post('onDeleteConfigurationsDetails', [RevenueManagementController::class, 'onDeleteConfigurationsDetails']);
});