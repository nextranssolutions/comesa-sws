<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\PaymentManagement\App\Http\Controllers\PaymentManagementController;

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


Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('revenuemanagement')->group(function () {
   
    Route::get('onLoadConfigurationData', [PaymentManagementController::class, 'onLoadConfigurationData']);
    Route::post('onsaveConfigData', [PaymentManagementController::class, 'onsaveConfigData']);
    Route::post('onEnableConfigurationsDetails', [PaymentManagementController::class, 'onEnableConfigurationsDetails']);
    Route::get('getAppRegulatoryFunctionFeeConfig', [PaymentManagementController::class, 'getAppRegulatoryFunctionFeeConfig']);
    Route::get('getFeesChargesConfigurations', [PaymentManagementController::class, 'getFeesChargesConfigurations']);
    Route::post('onDeleteConfigurationsDetails', [PaymentManagementController::class, 'onDeleteConfigurationsDetails']);
});