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

Route::middleware(['auth:sanctum'])->prefix('v1')->name('api.')->group(function () {
    Route::get('importexport', fn (Request $request) => $request->user())->name('importexport');
});

Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('import-export')->group(function () {
   
    Route::get('getSenderreceiversDetails', [ImportExportController::class, 'getSenderreceiversDetails']);
    Route::post('saveImportExportApplication', [ImportExportController::class,'saveImportExportApplication']);
    
});
