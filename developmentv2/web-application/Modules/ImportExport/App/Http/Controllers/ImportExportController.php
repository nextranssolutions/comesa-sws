<?php

namespace Modules\ImportExport\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class ImportExportController extends Controller
{
    public function getSenderreceiversDetails(Request $req)
    {

        try {

            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if ($req->searchValue != 'undefined' && $req->searchValue != '') {
                $searchValue = explode(',', $searchValue);
                $search_value =  $searchValue[2];
            }
            $table_name = $req->table_name;


            $qry = DB::table($table_name . ' as t1')
                ->select('t1.*', 't1.id', 't1.name', 't2.name as country', 't3.name as region', 't4.name as district')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->orderBy('id', 'DESC');

            if ($search_value != '') {
                $whereClauses = array();
                $whereClauses[] = "t1.name like '%" . ($search_value) . "%'";

                $whereClauses[] = "t1.physical_address  like '%" . ($search_value) . "%'";
                $filter_string = implode(' OR ', $whereClauses);
                $qry->whereRAW($filter_string);
            }

            $totalCount = $qry->count();
            if (validateIsNumeric($take)) {
                $records = $qry->skip($skip)->take($take)->get();
            } else {

                $records = $qry->get();
            }

            $res = array(
                'success' => true,
                'data' => $records,
                'totalCount' => $totalCount
            );
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }



    public function saveImportExportApplication(Request $req)
    {
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $product_type_id = $req->product_type_id;
            $regulatory_subfunction_id = $req->regulatory_subfunction_id;

            $proforma_currency_id = $req->proforma_currency_id;
            $id = $req->id;
            $tracking_no = $req->tracking_no;
            $record_id = $req->record_id;
            $zone_id = $req->zone_id;
            $device_type_id = $req->device_type_id;

            $application_code = $req->application_code;
            $import_typecategory_id = $req->import_typecategory_id;
            //dms get sub module flder getSubModuleNodereference() 731
            $where_app = array('application_code' => $application_code);
            // if (!recordExists('tra_application_documentsdefination', $where_app)) {
            //     initializeApplicationDMS(7, $regulatory_function_id, $regulatory_subfunction_id, $application_code, 'Applicatio' . rand(0, 1000), '');
            // }
            // $process_id = getSingleRecordColValue('wf_processes', array('regulatory_function_id' => $regulatory_function_id, 'product_type_id' => $product_type_id, 'regulatory_subfunction_id' => $regulatory_subfunction_id), 'id');
            $process_id = getSingleRecordColValue('wf_processes', array('id' => $id), 'id');

            $app_data = array(
                'product_type_id' => $req->product_type_id,
                'regulatory_subfunction_id' => $req->regulatory_subfunction_id,
                'regulatory_function_id' => $req->regulatory_function_id,
                'process_id' => $process_id,
                'permit_category_id' => $req->permit_category_id,
                'import_typecategory_id' => $req->import_typecategory_id,
                'permit_reason_id' => $req->permit_reason_id,
                'has_registered_outlets' => $req->has_registered_outlets,
                'reason_fornonregister_outlet' => $req->reason_fornonregister_outlet,
                'mode_oftransport_id' => $req->mode_oftransport_id,

                'eligible_importersdoctype_id' => $req->eligible_importersdoctype_id,
                'eligible_importerscategory_id' => $req->eligible_importerscategory_id,
                'document_upload_id' => $req->document_upload_id,

                'producttype_defination_id' => $req->producttype_defination_id,
                'port_id' => $req->port_id,
                'proforma_invoice_no' => $req->proforma_invoice_no,
                // 'proforma_invoice_date' => formatDate($req->proforma_invoice_date),
                'proforma_invoice_date' => $req->proforma_invoice_date,

                'paying_currency_id' => $req->paying_currency_id,
                'proforma_currency_id' => $req->proforma_currency_id,
                'consignee_options_id' => $req->consignee_options_id,
                'consignee_id' => $req->consignee_id,
                'sender_receiver_id' => $req->sender_receiver_id,
                'permit_productscategory_id' => $req->permit_productscategory_id,
                'premise_id' => $req->premise_id,
                'zone_id' => $req->zone_id
            );
            if ($regulatory_subfunction_id == 49) {

                $app_data['shipment_date'] = $req->shipment_date;
                $app_data['proposed_inspection_date'] = $req->proposed_inspection_date;
                $app_data['clearing_agent'] = $req->clearing_agent;
                $app_data['custom_declaration_no'] = $req->custom_declaration_no;
            }
            if ($regulatory_subfunction_id == 87) {

                $app_data['has_medical_prescription'] = $req->has_medical_prescription;
                $app_data['patients_email_address'] = $req->patients_email_address;
                $app_data['patients_fullnames'] = $req->patients_fullnames;
                $app_data['patients_identification_no'] = $req->patients_identification_no;
                $app_data['patients_phone_no'] = $req->patients_phone_no;
                $app_data['patients_physical_address'] = $req->patients_physical_address;
                $app_data['patientscountry_id'] = $req->patientscountry_id;
                $app_data['patientsdistrict_id'] = $req->patientsdistrict_id;
                $app_data['patientsregion_id'] = $req->patientsregion_id;
                $app_data['hospital_address'] = $req->hospital_address;
                $app_data['prescribing_doctor'] = $req->prescribing_doctor;
                $app_data['prescribling_hospital'] = $req->prescribling_hospital;
                $app_data['prescription_date'] = formatDate($req->prescription_date);
                $app_data['prescription_no'] = $req->prescription_no;
                $app_data['reason_for_authorisation'] = $req->reason_for_authorisation;
            }

            /** Already Saved */
            $table_name = 'tra_importexport_applications';
            $regulatory_subfunction_id = $req->regulatory_subfunction_id;

            if (validateIsNumeric($application_code)) {

                $where_app = array('application_code' => $application_code);

                if (recordExists('tra_importexport_applications', $where_app)) {

                    $app_data['altered_by'] = $trader_email;
                    $app_data['dola'] = Carbon::now();

                    $previous_data = getPreviousRecords('tra_importexport_applications', $where_app);
                    $reference_no = $previous_data['results'][0]['reference_no'];
                    $application_code = $previous_data['results'][0]['application_code'];

                    $resp =   updateRecord('tra_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);
                }
            } else {
                $record = '';


                $app_data['created_on'] = Carbon::now();

                $app_data['date_added'] = Carbon::now();
                $app_data['created_by'] = $trader_email;
                $app_data['trader_id'] = $trader_id;


                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_regulated_productstypes', array('id' => $product_type_id), 'code');

                $apptype_code = getSingleRecordColValue('par_regulatory_subfunctions', array('id' => $regulatory_subfunction_id), 'code');

                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code');


                $deviceTypecode = getSingleRecordColValue('par_device_types', array('id' => $device_type_id), 'code');
                $ref_id = 0;

                if ($product_type_id == 4) {

                    $codes_array = array(
                        'section_code' => $section_code,
                        'zone_code' => $zone_code,
                        'apptype_code' => $apptype_code,
                        'device_typecode' => $deviceTypecode,
                        'app_typecategory' => $apptype_categorycode
                    );
                } else {
                    $codes_array = array(
                        'section_code' => $section_code,
                        'zone_code' => $zone_code,
                        'apptype_code' => $apptype_code
                    );
                }
                $regulatory_function_id = getSingleRecordColValue('par_regulatory_subfunctions', array('id' => $req->regulatory_subfunction_id), 'regulatory_function_id');
                
                $application_code = generateApplicationCode($regulatory_subfunction_id, 'tra_importexport_applications');

                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('product_type_id' => $product_type_id), 'reference_format_id');
               
                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id);
                print_r($tracking_no);
                
                if (!validateIsNumeric($ref_id)) {
                    return \response()->json(array('success' => false, 'message' => 'Reference No Format has not been set, contact the system administrator'));
                } else if ($tracking_no == '') {
                    return \response()->json(array('success' => false, 'tracking_no' => $tracking_no, 'message' => $tracking_no));
                }
                $app_data['tracking_no'] =   $tracking_no;
                $app_data['reference_no'] =   $tracking_no;
                $app_data['record_id'] =   $record_id;
                $app_data['regulatory_function_id'] = $regulatory_function_id;

                $app_data['application_status_id'] =   1;
                $app_data['application_code'] =   $application_code;

                $resp = insertRecord('tra_importexport_applications', $app_data, $trader_email);

               
                $permit_id = $resp['record_id'];


                // if ($resp['success']) {
                //     initializeApplicationDMS($product_type_id, $regulatory_function_id, $regulatory_subfunction_id, $application_code, $tracking_no, $trader_id);
                //     //  saveApplicationSubmissionDetails($application_code,$table_name);  
                // }
            }
            if ($resp['success']) {
                $res = array(
                    'tracking_no' => $tracking_no,
                    'permit_id' => $permit_id,
                    'application_code' => $application_code,
                    'regulatory_function_id' => $regulatory_function_id,
                    // 'regulatory_subfunction_id' => $regulatory_subfunction_id,
                    'success' => true,
                    'message' => 'Permit Application Saved Successfully, with Tracking No: ' . $tracking_no
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Error Occurred Permit Application not saved, it this persists contact the system Administrator'
                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                //'data'=>$resp,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
    }
}
