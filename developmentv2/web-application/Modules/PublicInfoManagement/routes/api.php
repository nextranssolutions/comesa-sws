<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\PublicInfoManagement\App\Http\Controllers\PublicInfoManagementController;

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



Route::middleware(['XssSanitizer', 'clear_cache_config', 'firewall.all'])->prefix('publicinfomanagement')->group(function () {
    Route::post('onSearchExpertsProfileInformation', [PublicInfoManagementController::class, 'onSearchExpertsProfileInformation']);
    Route::get('getSystemNavigationItems', [PublicInfoManagementController::class, 'getSystemNavigationItems']);
    Route::get('getOrganisationServices', [PublicInfoManagementController::class, 'getOrganisationServices']);

    Route::get('onLoadExpertsPublicationManagement', [PublicInfoManagementController::class, 'onLoadExpertsPublicationManagement']);
    Route::get('onLoadExpertsResourceManagement', [PublicInfoManagementController::class, 'onLoadExpertsResourceManagement']);
    Route::get('onLoadKnowledgeCenterManagementData', [PublicInfoManagementController::class, 'onLoadKnowledgeCenterManagementData']);
    Route::get('onLoadPublicInfoConfig', [PublicInfoManagementController::class, 'onLoadPublicInfoConfig']);
    Route::get('onLoadHSCodes', [PublicInfoManagementController::class, 'onLoadHSCodes']);
    Route::get('onLoadHSCodesProductsRegistry', [PublicInfoManagementController::class, 'onLoadHSCodesProductsRegistry']);
    Route::get('onLoadProcedureDetails', [PublicInfoManagementController::class, 'onLoadProcedureDetails']);
    Route::get('onLoadRestrictionsProhibitions', [PublicInfoManagementController::class, 'onLoadRestrictionsProhibitions']);

    Route::get('onGetHelpDeskAccessDetails', [PublicInfoManagementController::class, 'onGetHelpDeskAccessDetails']);

    

});
