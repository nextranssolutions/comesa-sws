<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\DocumentManagement\App\Http\Controllers\DocumentManagementController;

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


Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('documentmanagement')->group(function () {
    Route::post('onaplicationDocumentUpload', [DocumentManagementController::class, 'onaplicationDocumentUpload']);
	
    Route::get('onLoaddocumentTypeRequirements', [DocumentManagementController::class, 'onLoaddocumentTypeRequirements']);
    Route::get('onLoadonLoadDocumentDataConfig', [DocumentManagementController::class, 'onLoadonLoadDocumentDataConfig']);
    Route::get('onLoadRegulatoryProcessDocdefination', [DocumentManagementController::class, 'onLoadRegulatoryProcessDocdefination']);

    
    Route::post('onSaveDMSSitedetails', [DocumentManagementController::class, 'onSaveDMSSitedetails']);
    Route::post('onSaveDMSProcessDocumentdefinationdetails', [DocumentManagementController::class, 'onSaveDMSProcessDocumentdefinationdetails']);
    Route::post('onSaveDMSNonStructuredDocdefinationdetails', [DocumentManagementController::class, 'onSaveDMSNonStructuredDocdefinationdetails']);
    
    
    Route::post('saveDMSNoStructuredDocDefinationDetails', [DocumentManagementController::class, 'saveDMSNoStructuredDocDefinationDetails']);
    Route::post('OnSaveDocumentRequirementsDef', [DocumentManagementController::class, 'OnSaveDocumentRequirementsDef']);
    
    Route::get('onLoadApplicationUploadeddocument', [DocumentManagementController::class, 'onLoadApplicationUploadeddocument']);
    Route::get('getApplicationDocumentDownloadurl', [DocumentManagementController::class, 'getApplicationDocumentDownloadurl']);
    Route::post('onDeleteUploadedDocumentDetails', [DocumentManagementController::class, 'onDeleteUploadedDocumentDetails']);
   
    Route::get('onLoaddocumentPreviewUploadedData', [DocumentManagementController::class, 'onLoaddocumentPreviewUploadedData']);
    
});