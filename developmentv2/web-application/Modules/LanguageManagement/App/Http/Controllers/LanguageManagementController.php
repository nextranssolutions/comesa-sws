<?php

namespace Modules\LanguageManagement\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Localization\DatabaseLoader;
use Illuminate\Support\Facades\DB;

class LanguageManagementController extends Controller
{

    public function getTranslations(Request $request, $locale)
{
    // Fetch translations from the database
    $translations = DB::table('tra_translation_management')
        ->join('par_system_labels', 'tra_translation_management.system_label_id', '=', 'par_system_labels.id')
        ->join('par_system_languages', 'tra_translation_management.system_language_id', '=', 'par_system_languages.id')
        ->where('par_system_languages.name', $locale)
        ->select('par_system_labels.name as key', 'tra_translation_management.translation as value')
        ->get()
        ->pluck('value', 'key');

    return response()->json($translations);
}

}
