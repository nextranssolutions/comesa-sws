<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\ImportExport\App\Http\Controllers\ImportExportController;


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


Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('import-export')->group(function () {
   
    Route::get('getSenderreceiversDetails', [ImportExportController::class, 'getSenderreceiversDetails']);
    Route::get('getTraderInformationDetails', [ImportExportController::class, 'getTraderInformationDetails']);
    Route::get('getPermitProductsDetails', [ImportExportController::class, 'getPermitProductsDetails']);
    Route::get('getRegisteredNonRegisteredProducts', [ImportExportController::class, 'getRegisteredNonRegisteredProducts']);
    Route::get('getManufacturersInformation', [ImportExportController::class, 'getManufacturersInformation']);
    Route::get('onLoadManufacturingSitesDetails', [ImportExportController::class, 'onLoadManufacturingSitesDetails']);
    Route::get('onGetRegulatedProductCategory', [ImportExportController::class, 'onGetRegulatedProductCategory']);
    Route::get('getApplicantPermitProductsDetails', [ImportExportController::class, 'getApplicantPermitProductsDetails']);
    Route::get('getImportExpPermitApplicationLoading', [ImportExportController::class, 'getImportExpPermitApplicationLoading']);
    Route::get('onLoadEvaluationChecklistDetails', [ImportExportController::class, 'onLoadEvaluationChecklistDetails']);
    
    Route::get('onLoadCustomsOfficeData', [ImportExportController::class, 'onLoadCustomsOfficeData']);
    
    Route::post('saveImportExportApplication', [ImportExportController::class,'saveImportExportApplication']);
    Route::post('onSaveUniformApplicantDataset', [ImportExportController::class,'onSaveUniformApplicantDataset']);
    Route::post('onSaveApplicantPermitProductsDetails', [ImportExportController::class,'onSaveApplicantPermitProductsDetails']);
    Route::post('onSavingApplicantEvaluationChecklistDetails', [ImportExportController::class,'onSavingApplicantEvaluationChecklistDetails']);
    
    Route::get('getImportExpApplicantPermitsLoading', [ImportExportController::class, 'getImportExpApplicantPermitsLoading']);
    Route::get('getImportApplicantPermitsProductsApplication', [ImportExportController::class, 'getImportApplicantPermitsProductsApplication']);
    
    
    Route::post('saveOgaImportExportApplication', [ImportExportController::class,'saveOgaImportExportApplication']);
    Route::post('onSavePermitProductsDetails', [ImportExportController::class,'onSavePermitProductsDetails']);
    Route::post('saveManufacturerDetails', [ImportExportController::class,'saveManufacturerDetails']);
});
