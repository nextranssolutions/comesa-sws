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
    protected $user_id;
    public function getSenderreceiversDetails(Request $req)
    {

        try {

            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value = '';
            if ($req->searchValue != 'undefined' && $req->searchValue != '') {
                $searchValue = explode(',', $searchValue);
                $search_value = $searchValue[2];
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


    public function saveOgaImportExportApplication(Request $req)
    {
        try {
            DB::beginTransaction();
            $application_id = $req->application_id;
            $transactionpermit_type_id = $req->transactionpermit_type_id;
            $product_type_id = $req->product_type_id;
            $permit_type_id = $req->permit_type_id;
            $trader_initiator_id = $req->trader_id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
            $applicant_id = $req->applicant_id;
            $local_agent_id = $req->local_agent_id;
            $reference_no = $req->reference_no;
            $application_reference_number = $req->application_reference_number;
            $regulatory_subfunction_id = $req->regulatory_subfunction_id;
            $zone_id = $req->zone_id;
            $process_id = $req->process_id;
            $id = $req->id;
            $product_res = '';
            $regulatory_function_id = 1;
            $regulatory_subfunction_id = 1;
            $app_data = array(
                'trader_id' => $trader_id,
                'local_agent_id' => $local_agent_id,
                'application_code' => $req->application_code,
                'oga_application_code' => $req->oga_application_code,
                'regulatory_subfunction_id' => $req->regulatory_subfunction_id,
                'application_id' => $application_id,
                'regulatory_function_id' => $regulatory_function_id,
                'product_type_id' => $req->product_type_id,
                'zone_id' => $req->zone_id,
                'reference_no' => $reference_no,
                'paying_currency_id' => $req->paying_currency_id,
                'application_status_id' => 1,
                'appworkflow_status_id' => 1,
                'process_id' => $process_id,
                'transactionpermit_type_id' => $transactionpermit_type_id,
                'document_upload_id' => $req->document_upload_id,
                'application_type_id' => $req->application_type_id,
                'application_reference_number' => $req->application_reference_number,
                'applicant_type_id' => $req->applicant_type_id,
                'permit_type_id' => $req->permit_type_id,
                'date_of_application' => $req->date_of_application,
                'expected_date_of_shipment' => $req->expected_date_of_shipment,
                'importer_exporter_id' => $req->importer_exporter_id,
                'port_type_id' => $req->port_type_id,
                'port_of_entryexit_id' => $req->port_of_entryexit_id,
                'customs_office' => $req->customs_office,
                'mode_oftransport_id' => $req->mode_oftransport_id,
                'transpoter_name' => $req->transpoter_name,
                'transporter_contact' => $req->transporter_contact,
                'transporter_country_id' => $req->transporter_country_id,
                'final_destination_country_id' => $req->final_destination_country_id,
                'invoice_type_id' => $req->invoice_type_id,
                'invoice_number' => $req->invoice_number,
                'invoice_date' => $req->invoice_date,
                'total_invoice_value' => $req->total_invoice_value,
                'currency_oftransaction_id' => $req->currency_oftransaction_id,
                'declaration_statuses_id' => $req->declaration_statuses_id,
            );
            $table_name = 'wb_importexport_applications';
            /** Already Saved */
            if (validateIsNumeric($application_id)) {

                $where = array('id' => $application_id);
                $where_app = array('application_id' => $application_id);

                if (recordExists('wb_importexport_applications', $where)) {

                    $product_infor['dola'] = Carbon::now();
                    $product_infor['altered_by'] = $email_address;

                    $previous_data = getPreviousRecords($table_name, $where);
                    $res = updateRecord('wb_importexport_applications', $previous_data, $where, $product_infor, $email_address);

                    $app_data = array(
                        'date_added' => Carbon::now(),
                        'altered_by' => $email_address,
                        'dola' => Carbon::now()
                    );
                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                    $tracking_no = $previous_data['results'][0]['tracking_no'];
                    $application_code = $previous_data['results'][0]['application_code'];
                    $application_reference_number = $tracking_no;
                    $resp = updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $email_address);
                }

                if ($resp['success']) {
                    $sql = DB::table('tra_application_documentsdefination')->where(array('application_code' => $application_code))->first();
                    if (!$sql) {
                        //print_r('test');
                        initializeApplicationDMS($product_type_id, $regulatory_function_id, $regulatory_subfunction_id, $application_code, $tracking_no . rand(0, 100), $trader_id);
                    }
                    $res = array(
                        'tracking_no' => $tracking_no,
                        'application_id' => $application_id,
                        'regulatory_function_id' => $regulatory_function_id,
                        'success' => true,

                        'application_code' => $application_code,
                        'message' => 'Product Application Saved Successfully, with Tracking No: ' . $tracking_no
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Error Occurred Product Application not saved, it this persists contact the system Administrator'
                    );
                }
            } else {
                $product_infor = array(
                    'application_id' => $application_id,
                    'product_type_id' => $product_type_id,
                    'permit_type_id' => $permit_type_id,
                    'trader_initiator_id' => $trader_initiator_id,
                    'applicant_id' => $applicant_id,
                    'application_reference_number' => $application_reference_number,
                );

                $resp = insertRecord('tra_application_documentsdefination', $product_infor, $email_address);

                $product_res = $resp;

                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('regulatory_function_id' => $regulatory_function_id), 'reference_format_id');
                // print_r('Hello: ' . $ref_id);
                // exit;

                $class_code = getSingleRecordColValue('par_classifications', array('id' => $req->classification_id), 'code');
                $process_id = getSingleRecordColValue('wf_processes', array('id' => $id, ), 'id');

             
                $codes_array = array(
                  
                    'class_code' => $class_code,
                    'process_id' => $process_id,
                );

                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $trader_id);


                if (!validateIsNumeric($ref_id)) {
                    return \response()->json(array('success' => false, 'message' => 'Reference No Format has not been set, contact the system administrator'));
                } else if ($tracking_no == '') {
                    return \response()->json(array('success' => false, 'tracking_no' => $tracking_no, 'message' => $tracking_no));
                }
                $application_code = generateApplicationCode($regulatory_subfunction_id, 'wb_importexport_applications');
                $oga_application_code = generateApplicationCode($regulatory_subfunction_id, 'tra_importexport_applications'); // Unique code

                $application_id = $resp['record_id'];

                $app_data['created_by'] = $email_address;
                $app_data['created_on'] = Carbon::now();
                $app_data['tracking_no'] = $tracking_no;
                $app_data['reference_no'] = $tracking_no;
                $app_data['process_id'] = $process_id;

                $app_data['regulatory_function_id'] = $regulatory_function_id;

                $app_data['date_added'] = Carbon::now();
                $app_data['application_code'] = $application_code;



                $app_data['application_status_id'] = 1;

                $resp = insertRecord('wb_importexport_applications', $app_data, $email_address);


                if ($resp['success']) {
                    // initializeApplicationDMS($product_type_id, $regulatory_function_id, $regulatory_subfunction_id);
                    // saveApplicationSubmissionDetails($application_code, 'ptl_product_applications');
                    $tra_app_data = $app_data;
                    $tra_app_data['application_code'] = $application_code;
                    $tra_app_data['oga_application_code'] = $oga_application_code;
                    $tra_app_data['applicant_id'] = $applicant_id;
                    $tra_app_data['permit_type_id'] = $permit_type_id;
                    $response = insertRecord('tra_importexport_applications', $tra_app_data, $email_address);


                    if ($response['success']) {
                        $res = array(
                            'tracking_no' => $tracking_no,
                            'application_id' => $application_id,
                            'regulatory_function_id' => $regulatory_function_id,
                            'application_code' => $application_code,
                            'applicant_id' => $applicant_id,
                            'transactionpermit_type_id' => $transactionpermit_type_id,
                            'oga_application_code' => $oga_application_code, // Include in response
                            'success' => true,
                            'message' => 'Application Saved Successfully, with Tracking No:' . $tracking_no
                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'message' => 'Error Occurred while saving to tra_importexport_applications. Contact the system administrator.'
                        );
                    }
                } else {
                    $res = array(
                        'success' => false,
                        'message1' => $resp['message'],
                        'message' => 'Error Occurred Application not saved, it this persists contact the system Administrator'
                    );
                }
            }

            if ($res['success']) {
                DB::commit();
            } else {
                DB::rollBack();
            }
        } catch (\Exception $exception) {
            DB::rollBack();

            $res = array(
                'success' => false,
                'message1' => $product_res,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message1' => $product_res,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
    }


    public function saveImportExportApplication(Request $req)
    {
        try {
            DB::beginTransaction();
            $workflowprocess_id = 1;
            $application_id = $req->application_id;
            $applicant_id = $req->applicant_id;
            $product_type_id = $req->product_type_id;
            $trader_initiator_id = $req->trader_id;
            $applicant_id = $req->trader_id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
            $applicationsubmission_type_id = $req->applicationsubmission_type_id;
            $local_agent_id = $req->local_agent_id;

            $reference_no = $req->reference_no;
            $regulatory_subfunction_id = 1; 
            $zone_id = $req->zone_id;
            // $process_id = $req->process_id;
            $workflowprocess_id = $req->workflowprocess_id;
            $id = $req->id;
            $product_res = '';

            // $regulatory_function_id = getSingleRecordColValue('par_regulatory_subfunctions', array('id' => $req->regulatory_subfunction_id), 'regulatory_function_id');

            $regulatory_function_id = 1;


            $app_data = array(
                'trader_id' => $trader_id,
                'local_agent_id' => $local_agent_id,
                'application_code' => $req->application_code,
                'regulatory_subfunction_id' => $req->regulatory_subfunction_id,
                'application_id' => $application_id,
                'applicant_id' => $req->applicant_id,
                'regulatory_function_id' => $regulatory_function_id,
                'application_options_id' =>$req->application_options_id,
                'product_type_id' => $req->product_type_id,
                'zone_id' => $req->zone_id,
                'reference_no' => $reference_no,
                'currency_oftransaction_id' => $req->currency_oftransaction_id,
                'application_status_id' => 1,
                'appworkflow_status_id' => 1,
                'wb_workflowprocesses' => $workflowprocess_id,
                'document_upload_id' => $req->document_upload_id,
                'application_type_id' => $req->application_type_id,
                'applicationsubmission_type_id' =>$req->applicationsubmission_type_id,
                'application_reference_number' => $req->application_reference_number,
                'applicant_type_id' => $req->applicant_type_id,
                'permit_type_id' => $req->permit_type_id,
                'date_of_application' => Carbon::now(),
                'expected_date_of_shipment' => $req->expected_date_of_shipment,
                'importer_exporter_id' => $req->importer_exporter_id,
                'port_type_id' => $req->port_type_id,
                'port_of_entryexit_id' => $req->port_of_entryexit_id,
                'customs_office_id' => $req->customs_office_id,
                'mode_of_transport_id' => $req->mode_of_transport_id,
                'transpoter_name' => $req->transpoter_name,
                'transporter_contact' => $req->transporter_contact,
                'transporter_country_id' => $req->transporter_country_id,
                'final_destination_country_id' => $req->final_destination_country_id,
                'invoice_type_id' => $req->invoice_type_id,
                'invoice_number' => $req->invoice_number,
                'invoice_date' => $req->invoice_date,
                'total_invoice_value' => $req->total_invoice_value,
                'declaration_statuses_id' => $req->declaration_statuses_id,

            );
            $table_name = 'wb_importexport_applications';
            /** Already Saved */
            if (validateIsNumeric($application_id)) {

                $where = array('id' => $application_id);
                $where_app = array('application_id' => $application_id);

                if (recordExists('wb_importexport_applications', $where)) {

                    $product_infor['dola'] = Carbon::now();
                    $product_infor['altered_by'] = $email_address;

                    $previous_data = getPreviousRecords($table_name, $where);
                    $res = updateRecord('wb_importexport_applications', $previous_data, $where, $product_infor, $email_address);

                    $app_data = array(
                        'date_added' => Carbon::now(),
                        'altered_by' => $email_address,
                        'dola' => Carbon::now()
                    );
                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                    $tracking_no = $previous_data['results'][0]['tracking_no'];
                    $application_code = $previous_data['results'][0]['application_code'];

                    $resp = updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $email_address);
                }

                if ($resp['success']) {
                    $sql = DB::table('tra_application_documentsdefination')->where(array('application_code' => $application_code))->first();
                    if (!$sql) {
                        //print_r('test');
                        // initializeApplicationDMS($product_type_id, $regulatory_function_id, $regulatory_subfunction_id, $application_code, $tracking_no . rand(0, 100), $trader_id);
                    }
                    $res = array(
                        'tracking_no' => $tracking_no,
                        'application_id' => $application_id,
                        'regulatory_function_id' => $regulatory_function_id,
                        'success' => true,

                        'application_code' => $application_code,
                        'message' => 'Product Application Saved Successfully, with Tracking No: ' . $tracking_no
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Error Occurred Product Application not saved, it this persists contact the system Administrator'
                    );
                }
            } else {
                $product_infor = array(
                    'application_id' => $application_id,
                    'product_type_id' => $product_type_id,
                    'trader_initiator_id' => $trader_initiator_id,
                    'applicant_id' => $applicant_id,
                );

                $resp = insertRecord('tra_application_documentsdefination', $product_infor, $email_address);

                $product_res = $resp;

                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('regulatory_function_id' => $regulatory_function_id), 'reference_format_id');

                $zone_code = getSingleRecordColValue('par_zones', array('id' => $req->zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_regulated_productstypes', array('id' => $req->product_type_id), 'code');
                $class_code = getSingleRecordColValue('par_classifications', array('id' => $req->classification_id), 'code');
                $workflowprocess_id = getSingleRecordColValue('wb_workflowprocesses', array('regulatory_function_id' => $regulatory_function_id, ), 'id');

                if ($class_code == '') {
                    $class_code = $section_code;
                }
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
                    'class_code' => $class_code,
                    'workflowprocess_id' => $workflowprocess_id,

                );


                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $workflowprocess_id, $trader_id);


                if (!validateIsNumeric($ref_id)) {
                    return \response()->json(array('success' => false, 'message' => 'Reference No Format has not been set, contact the system administrator'));
                } else if ($tracking_no == '') {
                    return \response()->json(array('success' => false, 'tracking_no' => $tracking_no, 'message' => $tracking_no));
                }
                $application_code = generateApplicationCode($regulatory_subfunction_id, 'wb_importexport_applications');
                $tra_application_code = $application_code;
             
                $workflowprocess_id = getSingleRecordColValue('wb_workflowprocesses', array('regulatory_function_id' => $regulatory_function_id, ), 'id');

                $application_id = $resp['record_id'];

                $app_data['created_by'] = $email_address;
                $app_data['created_on'] = Carbon::now();
                $app_data['tracking_no'] = $tracking_no;
                $app_data['reference_no'] = $tracking_no;
                $app_data['workflowprocess_id'] = $workflowprocess_id;
                $app_data['applicationsubmission_type_id'] = $applicationsubmission_type_id;
                $app_data['regulatory_function_id'] = $regulatory_function_id;

                $app_data['date_added'] = Carbon::now();
                $app_data['application_code'] = $application_code;
               



                $app_data['application_status_id'] = 1;

                $resp = insertRecord('wb_importexport_applications', $app_data, $email_address);


                if ($resp['success']) {
                    // initializeApplicationDMS($product_type_id, $regulatory_function_id, $regulatory_subfunction_id);
                    // saveApplicationSubmissionDetails($application_code, 'ptl_product_applications');
                    $tracking_no . rand(0, 100);

                    $res = array(
                        'tracking_no' => $tracking_no,
                        'application_id' => $application_id,
                        'regulatory_function_id' => $regulatory_function_id,
                        'applicationsubmission_type_id' => $applicationsubmission_type_id,
                        'application_code' => $application_code,
                        'workflowprocess_id' => $workflowprocess_id,
                        'success' => true,
                        'message' => 'Application Saved Successfully, with Tracking No:' . $tracking_no
                    );

                    $response = insertRecord('tra_importexport_applications', $app_data, $email_address);
                    
                    if ($response['success']) {
                        $res = array(
                            'tracking_no' => $tracking_no,
                            'application_id' => $application_id,
                            'regulatory_function_id' => $regulatory_function_id,
                            'applicationsubmission_type_id' =>$applicationsubmission_type_id,
                            'application_code' => $tra_application_code,
                            'success' => true,
                            'message' => 'Application Saved Successfully, with Tracking No:' . $tracking_no
                        );
                    }
                } else {
                    $res = array(
                        'success' => false,
                        'message1' => $resp['message'],
                        'message' => 'Error Occurred Application not saved, it this persists contact the system Administrator'
                    );
                }
            }

            if ($res['success']) {
                DB::commit();
            } else {
                DB::rollBack();
            }
        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message1' => $product_res,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message1' => $product_res,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
    }

    public function onSaveUniformApplicantDataset(Request $req)
    {
        try {
            $resp = "";
            $trader_id = $req->trader_id;
            $traderemail_address = $req->traderemail_address;
            $email_address = $req->email_address;
            $email = $req->email;
            $error_message = 'Error occurred, data not saved successfully';

            $data = $req->all();
            $table_name = $req->table_name;
            $record_id = $req->id;
            $product_id = $req->product_id;
            unset($data['table_name']);
            unset($data['traderemail_address']);

            if (isset($data['trader_id'])) {
                unset($data['trader_id']);
            }
            if (isset($data['product_id'])) {
                unset($data['product_id']);
            }
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $traderemail_address;

                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data, $where, $data, $traderemail_address);
                }
            } else {
                //insert 
                $data['created_by'] = $traderemail_address;
                $data['created_on'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $traderemail_address);

                $record_id = $resp['record_id'];
            }
            if ($resp['success']) {
                $res = array(
                    'success' => true,
                    'record_id' => $record_id,
                    'message' => 'Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $error_message
                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'messa1' => $resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
    }

    public function onSavePermitProductsDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;

            $unit_price = $req->unit_price;
            $currency_id = $req->currency_id;

            $packaging_unit_id = $req->packaging_unit_id;
            $quantity = $req->quantity;
            $laboratory_no = $req->laboratory_no;
            $regulated_prodpermit_id = $req->regulated_prodpermit_id;
            $product_id = $req->product_id;
            $record_id = $req->id;
            $device_type_id = $req->device_type_id;
            // $permitprod_recommendation_id = $req->permitprod_recommendation_id;

            $regulatory_subfunction_id = $req->regulatory_subfunction_id;

            $batch_number = $req->batch_number;
            $application_code = generateApplicationCode($regulatory_subfunction_id, 'tra_permit_products');
            $expiry_date = $req->expiry_date;
            $manufacturing_date = $req->manufacturing_date;
            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency 
            $record = DB::table('tra_permit_products')
                ->where(array('application_code' => $application_code))
                ->whereNotIn('currency_id', [$currency_id])
                ->get();

            if (!count($record) > 0) {
                $table_name = 'tra_permit_products';


                $data = array(
                    'unit_price' => $unit_price,

                    'section_id' => $req->section_id,
                    'productphysical_description' => $req->productphysical_description,
                    'packaging_unit_id' => $packaging_unit_id,


                    'product_name' => $req->product_name,
                    'brand_name' => $req->brand_name,
                    'quantity' => $quantity,
                    'regulated_productcategory_id' => $req->regulated_productcategory_id,
                    'manufacturer_id' => $req->manufacturer_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'unit_of_measure_id' => $req->unit_of_measure_id,
                    'product_value' => $req->product_value,
                    'currency_id' => $currency_id,
                    'weight_unit_id' => $req->weight_unit_id,
                    'product_packaging' => $req->product_packaging,
                    'permit_product_purposes_id' => $req->permit_product_purposes_id,
                    'consignment_id' => $req->consignment_id,
                    'batch_number' => $batch_number,
                    'manufacturing_date' => $manufacturing_date,
                    'expiry_date' => $expiry_date,
                    'storage_condition_id' => $req->storage_condition_id,

                    'common_name_id' => $req->common_name_id,
                    'classification_id' => $req->classification_id,
                    'product_category_id' => $req->product_category_id,
                    'product_subcategory_id' => $req->product_subcategory_id,
                    'product_strength' => $req->product_strength,
                    'weights_units_id' => $req->weights_units_id,
                    'total_weight' => $req->total_weight,
                    'device_type_id' => $device_type_id,
                    'product_id' => $product_id,
                    'prodclass_category_id' => $req->prodclass_category_id,
                    'unitpack_size' => $req->unitpack_size,
                    'unitpack_unit_id' => $req->unitpack_unit_id,
                    'application_code' => $req->application_code,
                    'dosage_form_id' => $req->dosage_form_id
                );

                // if (validateIsNumeric($permitprod_recommendation_id)) {

                //     $data['permitprod_recommendation_id'] = $req->permitprod_recommendation_id;
                //     $data['permitprod_recommendation'] = $req->permitprod_recommendation;
                // }

                if (validateIsNumeric($record_id)) {
                    $where = array('id' => $record_id);
                    if (recordExists($table_name, $where)) {

                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $user_id;

                        $previous_data = getPreviousRecords($table_name, $where);
                        $previous_data = $previous_data['results'];

                        $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);
                    }
                } else {

                    //insert 
                    // $data['permitprod_recommendation_id'] = 1;
                    $data['created_by'] = $user_id;
                    $data['created_on'] = Carbon::now();
                    $resp = insertRecord($table_name, $data, $user_id);

                    $record_id = $resp['record_id'];
                }
                if ($resp['success']) {
                    $res = array(
                        'success' => true,
                        'record_id' => $record_id,
                        'message' => 'Saved Successfully'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message1' => $resp['message'],
                        'message' => $error_message
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Mis-match product permits currency, confirm the previous currency and make sure currencies match'
                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'resp' => $resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
    }


    public function onSaveApplicantPermitProductsDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;

            $unit_price = $req->unit_price;
            $currency_id = $req->currency_id;

            $packaging_unit_id = $req->packaging_unit_id;
            $quantity = $req->quantity;
            $laboratory_no = $req->laboratory_no;
            $regulated_prodpermit_id = $req->regulated_prodpermit_id;
            $product_id = $req->product_id;
            $record_id = $req->id;
            $device_type_id = $req->device_type_id;
            // $permitprod_recommendation_id = $req->permitprod_recommendation_id;

            $regulatory_subfunction_id = $req->regulatory_subfunction_id;

            $batch_number = $req->batch_number;
            $application_code = generateApplicationCode($regulatory_subfunction_id, 'tra_permit_products');
            $expiry_date = $req->expiry_date;
            $manufacturing_date = $req->manufacturing_date;
            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency 
            $record = DB::table('wb_permit_products')
                ->where(array('application_code' => $application_code))
                ->whereNotIn('currency_id', [$currency_id])
                ->get();

            if (!count($record) > 0) {
                $table_name = 'wb_permit_products';


                $data = array(
                    'unit_price' => $unit_price,

                    'section_id' => $req->section_id,
                    'productphysical_description' => $req->productphysical_description,
                    'packaging_unit_id' => $packaging_unit_id,
                    'product_name' => $req->product_name,
                    'brand_name' => $req->brand_name,
                    'quantity' => $quantity,
                    'regulated_productcategory_id' => $req->regulated_productcategory_id,
                    'manufacturer_id' => $req->manufacturer_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'unit_of_measure_id' => $req->unit_of_measure_id,
                    'product_value' => $req->product_value,
                    'currency_id' => $currency_id,
                    'weight_unit_id' => $req->weight_unit_id,
                    'product_packaging' => $req->product_packaging,
                    'permit_product_purposes_id' => $req->permit_product_purposes_id,
                    'consignment_id' => $req->consignment_id,
                    'batch_number' => $batch_number,
                    'manufacturing_date' => $manufacturing_date,
                    'expiry_date' => $expiry_date,
                    'storage_condition_id' => $req->storage_condition_id,

                    'common_name_id' => $req->common_name_id,
                    'classification_id' => $req->classification_id,
                    'product_category_id' => $req->product_category_id,
                    'product_subcategory_id' => $req->product_subcategory_id,
                    'product_strength' => $req->product_strength,
                    'weights_units_id' => $req->weights_units_id,
                    'total_weight' => $req->total_weight,
                    'device_type_id' => $device_type_id,
                    'product_id' => $product_id,
                    'prodclass_category_id' => $req->prodclass_category_id,
                    'unitpack_size' => $req->unitpack_size,
                    'unitpack_unit_id' => $req->unitpack_unit_id,
                    'application_code' => $req->application_code,
                    'dosage_form_id' => $req->dosage_form_id
                );

                // if (validateIsNumeric($permitprod_recommendation_id)) {

                //     $data['permitprod_recommendation_id'] = $req->permitprod_recommendation_id;
                //     $data['permitprod_recommendation'] = $req->permitprod_recommendation;
                // }

                if (validateIsNumeric($record_id)) {
                    $where = array('id' => $record_id);
                    if (recordExists($table_name, $where)) {

                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $user_id;

                        $previous_data = getPreviousRecords($table_name, $where);
                        $previous_data = $previous_data['results'];

                        $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);
                    }
                } else {

                    //insert 
                    // $data['permitprod_recommendation_id'] = 1;
                    $data['created_by'] = $user_id;
                    $data['created_on'] = Carbon::now();
                    $resp = insertRecord($table_name, $data, $user_id);

                    $record_id = $resp['record_id'];
                }
                if ($resp['success']) {
                    $res = array(
                        'success' => true,
                        'record_id' => $record_id,
                        'message' => 'Saved Successfully'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message1' => $resp['message'],
                        'message' => $error_message
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Mis-match product permits currency, confirm the previous currency and make sure currencies match'
                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'resp' => $resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
    }








    public function saveManufacturerDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;
            $physical_address = $req->physical_address;
            $manufacturer_name = $req->name;
            $record_id = $req->id;

            $error_message = 'Error occurred, data not saved successfully';
            $table_name = 'tra_manufacturer_info';

            $data = [
                'name' => $manufacturer_name,
                'physical_address' => $physical_address,
            ];

            // Check if the record exists
            if (validateIsNumeric($record_id)) {
                $where = ['id' => $record_id];

                if (recordExists($table_name, $where)) {
                    // Update record
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);
                    $previous_data = $previous_data['results'];

                    $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);
                    $manufacturer_id = $record_id; // Keep the same ID for updates
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Record not found'
                    ]);
                }
            } else {
                // Insert new record
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $user_id);

                if (!isset($resp['record_id'])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to insert record'
                    ]);
                }

                $manufacturer_id = $resp['record_id'];
            }

            if (isset($resp['success']) && $resp['success']) {
                return response()->json([
                    'success' => true,
                    'manufacturer_id' => $manufacturer_id,
                    'manufacturer_name' => $manufacturer_name,
                    'physical_address' => $physical_address,
                    'message' => 'Saved Successfully'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message1' => $resp['message'] ?? '',
                    'message' => $error_message
                ]);
            }
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'success' => false,
                'message' => $throwable->getMessage()
            ]);
        }
    }

    public function onLoadEvaluationChecklistDetails(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $transactionpermit_type_id = $req->transactionpermit_type_id;
            $process_id = $req->process_id;
            $permittype_data = array();
            $table_name = 'tra_transactionpermit_checklists';
            $table_name = base64_decode($table_name);

            $sql = DB::table('chk_checklist_types as t1')
                ->join('chk_checklist_definations as t2', 't1.id', 't2.checklist_type_id')
                ->leftJoin('tra_transactionpermit_checklists as t3', function ($join) use ($application_code, $transactionpermit_type_id) {
                    $join->on('t3.checklist_defination_id', '=', 't2.id');
                    if (validateIsNumeric($application_code)) {
                        $join->on('t3.application_code', '=', DB::raw($application_code));
                    }
                    if (validateIsNumeric($transactionpermit_type_id)) {
                        $join->on('t3.transactionpermit_type_id', '=', DB::raw($transactionpermit_type_id));
                    }
                })
                ->select(DB::raw("t3.*,t1.name as main_factor,t2.id as checklist_defination_id, t2.name as checklist_type, t2.marks_allocated as total_marks"));
            // if (validateIsNumeric($process_id)) {
            //     $sql->where('t1.process_id', $process_id);
            // }
            $permittype_data = $sql->orderBy('t1.order_no', 'desc')->orderBy('t2.order_no', 'desc')->get();

            $res = array('success' => true, 'data' => $permittype_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onSavingApplicantEvaluationChecklistDetails(Request $req)
    {
        try {

            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = 'tra_transactionpermit_checklists';
            $permit_data = $req->permit_data;
            $record_id = $req->id;

            $permit_data = json_decode($permit_data);
            if (is_array($permit_data)) {
                //"system_label_id":1,"system_language_id":2,"translation":"Besoin daide ou de clarification"
                foreach ($permit_data as $rec) {
                    $transactionpermit_type_id = $rec->transactionpermit_type_id;
                    $application_code = $rec->application_code;
                    $checklist_defination_id = $rec->checklist_defination_id;

                    $checklist_type_id = $rec->checklist_type_id;
                    $checklist_defination_id = $rec->checklist_defination_id;
                    $checklist_item_id = $rec->checklist_item_id;
                    $self_assessment = $rec->self_assessment;
                    $assessment = $rec->assessment;
                    $assessment_review = $rec->assessment_review;
                    //get data 
                    $checklist_data = getSingleRecord('chk_checklist_definations', array('id' => $checklist_defination_id));
                    $marks_allocated = $checklist_data->marks_allocated;

                    $where = array(
                        'transactionpermit_type_id' => $transactionpermit_type_id,
                        'application_code' => $application_code,
                        'checklist_defination_id' => $checklist_defination_id,
                        'checklist_type_id' => $checklist_type_id,

                    );
                    $data = array(
                        'application_code' => $application_code,
                        'transactionpermit_type_id' => $transactionpermit_type_id,
                        'checklist_defination_id' => $checklist_defination_id,
                        'checklist_item_id' => $checklist_item_id,
                        'self_assessment' => $self_assessment,
                        'assessment' => $assessment,
                        'assessment_review' => $assessment_review,
                    );

                    if (isset($rec->supervisors_marks)) {
                        if ($rec->supervisors_marks > $marks_allocated) {
                            $res = array('success' => false, 'message' => 'Supervisors marks should be less or equal to the allocated marks');
                            return response()->json($res);
                        }

                        $data['supervisors_marks'] = $rec->supervisors_marks;
                    }
                    if (isset($rec->second_appraisor_marks)) {
                        if ($rec->second_appraisor_marks > $marks_allocated) {
                            $res = array('success' => false, 'message' => 'Second appraisor_marks should whoul be less or equal to the allocated marks');
                            return response()->json($res);
                        }

                        $data['second_appraisor_marks'] = $rec->second_appraisor_marks;
                    }
                    if (isset($rec->third_appraisor_marks)) {
                        if ($rec->third_appraisor_marks > $marks_allocated) {
                            $res = array('success' => false, 'message' => 'Third appraisor_marks should whoul be less or equal to the allocated marks');

                            return response()->json($res);
                        }

                        $data['third_appraisor_marks'] = $rec->third_appraisor_marks;
                    }

                    $records = DB::table($table_name)->where($where)->get();
                    if (count($records) > 0) {
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $user_id;
                        $previous_data = getPreviousRecords($table_name, $where);
                        $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                    } else {

                        $data['created_by'] = $user_id;
                        $data['created_on'] = Carbon::now();
                        $resp = insertRecord($table_name, $data, $user_name);
                    }

                }
            }
            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
                );
            }


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }

    public function saveManufacturerDetailsa(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;
            $data = $req->all();
            $physical_address = $req->physical_address;
            $manufacturer_name = $req->name;
            $table_name = $req->model;
            $record_id = $req->id;
            unset($data['table_name']);
            unset($data['model']);
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {
                    $manufacturer_id = $record_id;
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_id);

                }
            } else {
                //insert
                //check duplicate
                $where = array(
                    'name' => $manufacturer_name,
                    'physical_address' => $physical_address
                );
                if (!recordExists($table_name, $where)) {
                    $data['created_by'] = $user_id;
                    $data['created_on'] = Carbon::now();

                    $resp = insertRecord('tra_manufacturer_info', $data, $user_id);
                    $manufacturer_id = $resp['record_id'];

                } else {
                    $resp = array('success' => false, 'message' => 'The Manufacturer details exists');
                }

            }
            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'manufacturer_id' => $manufacturer_id,
                    'manufacturer_name' => $manufacturer_name,
                    'physical_address' => $physical_address,
                    'message' => 'Saved Successfully'
                );

            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
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
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

    public function getTraderInformationDetails(Request $req)
    {
        try {
            $search_value = '';
            $take = 50; // Default take
            $skip = 0; // Default skip
            $searchValue = $req->searchValue ?? '';

            if (!empty($searchValue) && $searchValue !== 'undefined') {
                $searchValue = explode(',', $searchValue);
                $search_value = $searchValue[2] ?? '';
            }

            $is_local_agent = $req->is_local_agent;
            $data = collect();
            $totalCount = 0;


            $data = DB::table('tra_trader_account as t1')
                ->leftJoin('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->select(
                    't1.id',
                    't1.name as applicant_name',
                    't1.contact_person',
                    't1.tin_no',
                    't1.country_id as country_id',
                    't1.region_id as region_id',
                    't1.district_id as district_id',
                    't2.name as country_name',
                    't4.name as district_name',
                    't3.name as region_name',
                    't1.physical_address',
                    't1.postal_address',
                    't1.telephone_no as telephone_no',
                    't1.fax as fax',
                    't1.email_address',
                    't1.website as website'
                )
               
                ->orderByDesc('t1.id')
                ->get();
                    /*
 ->when(
                    $search_value,
                    fn($query) =>
                    $query->where('t1.name', 'LIKE', "%{$search_value}%")
                )
                    */
            $totalCount = $data->count();


            return response()->json([
                'success' => true,
                'data' => $data,
                'totalCount' => $totalCount
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getPermitProductsDetails(Request $req)
    {
        try {
            $search_value = '';
            $take = 50; // Default take
            $skip = 0; // Default skip
            $searchValue = $req->searchValue ?? '';

            if (!empty($searchValue) && $searchValue !== 'undefined') {
                $searchValue = explode(',', $searchValue);
                $search_value = $searchValue[2] ?? '';
            }

            $application_code = $req->application_code;
            $data = collect();
            $totalCount = 0;

            $data = DB::table('tra_permit_products as t1')
                // ->leftJoin('par_regulatedproduct_categories as t2', 't1.regulated_productcategory_id', '=', 't2.id')
                ->leftJoin('tra_manufacturer_info as t3', 't1.manufacturer_id', '=', 't3.id')
                ->leftJoin('par_unit_of_measure as t4', 't1.unit_of_measure_id', '=', 't4.id')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_storage_conditions as t6', 't1.storage_conditions_id', '=', 't6.id')
                ->select(
                    't1.id',
                    't1.*',
                    't3.name as manufacturer_name',
                    't4.name as unit_of_measure',
                    't5.name as storage_conditions'
                )
                ->where('t1.application_code',$application_code)
                ->orderByDesc('t1.id')
                ->get();
            $totalCount = $data->count();
            return response()->json([
                'success' => true,
                'data' => $data,
                'totalCount' => $totalCount
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function getApplicantPermitProductsDetails(Request $req)
    {
        try {
            $search_value = '';
            $take = 50; // Default take
            $skip = 0; // Default skip
            
            $application_code = $req->application_code;
            $data = collect();
            $totalCount = 0;
            $data = DB::table('wb_permit_products as t1')
                ->leftJoin('tra_manufacturer_info as t3', 't1.manufacturer_id', '=', 't3.id')
                ->leftJoin('par_unit_of_measure as t4', 't1.unit_of_measure_id', '=', 't4.id')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_storage_conditions as t6', 't1.storage_conditions_id', '=', 't6.id')
                ->select(
                    't1.id',
                    't1.*',
                    't3.name as manufacturer_name',
                    't4.name as unit_of_measure',
                    't5.name as storage_conditions'
                )
                ->where('t1.application_code',$application_code)
                ->orderByDesc('t1.id')
                ->get();

            $totalCount = $data->count();


            return response()->json([
                'success' => true,
                'data' => $data,
                'totalCount' => $totalCount
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function onLoadManufacturingSitesDetails(Request $req)
    {
        try {
            $search_value = null;
            $take = $req->input('take', 50); // Allow dynamic take value, default is 50
            $skip = $req->input('skip', 0);  // Allow dynamic skip value, default is 0
            $searchValue = $req->input('searchValue', '');

            if (!empty($searchValue) && $searchValue !== 'undefined') {
                $searchParts = explode(',', $searchValue);
                $search_value = $searchParts[2] ?? null;
            }

            $query = DB::table('tra_manufacturer_info as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->select(
                    't1.id',
                    't1.*',
                    't1.name as manufacturer_name',
                    't1.physical_address',
                    't1.email_address',
                    't1.contact_person',
                    't2.name as country_name',
                    't3.name as region_name',
                    't4.name as district',
                    DB::raw("CONCAT(t1.name, ' (', t2.name, ')') as manufacturer_namecountry")
                )
                ->when($search_value, function ($query) use ($search_value) {
                    $query->where('t1.name', 'LIKE', "%{$search_value}%");
                });

            // Get total count before applying pagination
            $totalCount = $query->count();

            // Apply pagination (skip & take)
            $data = $query->skip($skip)->take($take)->orderByDesc('t1.id')->get();

            return response()->json([
                'success' => true,
                'data' => $data,
                'totalCount' => $totalCount
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public function onGetRegulatedProductCategory(Request $req)
    {
        try {
            $table_name = 'tra_hscodesproducts_registry';
            $take = 50; // Default take value
            $skip = 0; // Default skip value
            $searchValue = $req->searchValue ?? '';
            $chapters_keywordsearch = $req->chapters_keywordsearch;

            // Process search value
            $search_value = '';
            if (!empty($searchValue) && $searchValue !== 'undefined') {
                $searchValueArray = explode(',', $searchValue);
                $search_value = $searchValueArray[2] ?? '';
            }

            // Initialize query with necessary joins and select statements
            $query = DB::table("{$table_name} as t1")
                ->leftJoin('par_hscodechapters_defination as t3', 't1.chapters_defination_id', '=', 't3.id')
                ->leftJoin('par_hscodesheading_definations as t4', 't1.heading_definations_id', '=', 't4.id')
                ->leftJoin('par_hscodessubheading_defination as t5', 't1.subheading_definations_id', '=', 't5.id')
                ->select(
                    't1.id',
                    't1.chapters_defination_id',
                    't1.heading_definations_id',
                    't1.subheading_definations_id',
                    't5.name as hscodessubheading',
                    't5.hscode as subheadingcode',
                    't3.name as hscodechapters',
                    't3.hscode as chapterscode',
                    't4.name as hscodesheading',
                    't4.hscode as headingcode'
                );

            // Apply keyword search filter before fetching data
            if (!empty($chapters_keywordsearch)) {
                $query->where(function ($q) use ($chapters_keywordsearch) {
                    $q->where('t1.chapters_defination_id', 'like', "%{$chapters_keywordsearch}%")
                        ->orWhere('t1.heading_definations_id', 'like', "%{$chapters_keywordsearch}%")
                        ->orWhere('t1.subheading_definations_id', 'like', "%{$chapters_keywordsearch}%");
                });
            }

            // Fetch total count before pagination
            $totalCount = $query->count();

            // Apply pagination
            $data = $query->orderByDesc('t1.id')->take($take)->skip($skip)->get();

            // Transform data efficiently
            $productregistry_data = $data->map(function ($rec) {
                return [
                    'id' => $rec->id,
                    'chapters_defination_id' => $rec->chapters_defination_id,
                    'heading_definations_id' => $rec->heading_definations_id,
                    'subheading_definations_id' => $rec->subheading_definations_id,
                    'hscodesheading' => trim("{$rec->headingcode} {$rec->hscodesheading}"),
                    'hscodechapters' => trim("{$rec->chapterscode} {$rec->hscodechapters}"),
                    'hscodessubheading' => trim("{$rec->subheadingcode} {$rec->hscodessubheading}"),
                    'regulated_product_category' => $rec->hscodessubheading,
                    'headingcode' => $rec->headingcode,
                    'chapterscode' => $rec->chapterscode,
                    'subheadingcode' => $rec->subheadingcode,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $productregistry_data,
                'totalCount' => $totalCount
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public function getImportExpPermitApplicationLoading(Request $req)
    {
        try {
            $process_id = $req->process_id;
            $user_id = $req->user_id;

            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = 'tra_importexport_applications';
            $appworkflow_status_id = $req->appworkflow_status_id;
            $application_status_id = $req->application_status_id;
            $workflow_status_id = $req->workflow_status_id;
            $appworkflowstatus_category_id = $req->appworkflowstatus_category_id;

            $permit_product_data = array();
            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('tra_transactionpermit_types as t2', 't2.id', 't1.permit_type_id')
                ->leftJoin('par_port_type as t3', 't3.id', 't1.port_type_id')
                ->leftJoin('tra_permitsenderreceiver_data as t4', 't4.id', 't1.importer_exporter_id')
                ->leftJoin('par_entryexit_port as t5', 't1.port_of_entryexit_id', 't5.id')
                ->leftJoin('wf_workflowstageprocess_actions as t7', function ($join) use ($process_id) {
                    $join->on('t1.appworkflow_status_id', '=', 't7.workflow_status_id');
                    if (validateIsNumeric($process_id)) {
                        $join->on('t7.process_id', '=', DB::raw($process_id));
                    }
                    $join->on('t7.is_default_action', '=', DB::raw(True));
                })

                ->leftJoin('wf_statuses_actions as t8', 't7.statuses_action_id', 't8.id')
                ->leftJoin('wf_workflow_statuses as t9', 't1.appworkflow_status_id', 't9.id')
                ->leftJoin('par_application_statuses as t10', 't1.application_status_id', 't10.id')
                ->leftJoin('par_permit_typecategories as t11', 't1.permit_type_id', 't11.id')
                ->leftJoin('par_currencies as t12', 't1.currency_oftransaction_id', 't12.id')
                ->leftJoin('par_mode_oftransport as t13', 't1.mode_of_transport_id', 't13.id')
                ->leftJoin('par_countries as t14', 't1.final_destination_country_id', 't14.id')
                ->leftJoin('par_invoice_types as t15', 't1.invoice_type_id', 't15.id')
                ->leftJoin('par_currencies as t16', 't1.currency_oftransaction_id', 't16.id')
                ->leftJoin('par_confirmations as t17', 't1.declaration_statuses_id', 't17.id')

                ->select('t1.*', 't17.name as declaration', 't16.name as currency_name', 't15.name as invoice_type', 't14.name as final_destination_country', 't5.name as port_of_entry', 't13.name as mode_of_transport', 't12.name as currency_name', 't11.name as permit_type', 't10.name as application_status', 't8.name as action_name', 't8.iconCls as iconCls', 't8.action as action', 't2.name as permit_name', 't3.name as port_type', 't1.id', 't4.name as importer_exporter_name');

            if ($workflow_status_id != '') {
                $workflow_status = explode(',', $workflow_status_id);
                $sql->whereIn('appworkflow_status_id', $workflow_status);
            }
            if (validateIsNumeric($appworkflowstatus_category_id)) {
                $sql->where(array('t9.appworkflowstatus_category_id' => $appworkflowstatus_category_id));
            }
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }

            $actionColumnData = returnContextMisMenuActions($process_id);
            //check the usres 

            $data = $sql->get();

            foreach ($data as $rec) {
                $application_data[] = array(
                    'id' => $rec->id,
                    'action_name' => $rec->action_name,
                    'iconCls' => $rec->iconCls,
                    'application_status' => $rec->application_status,
                    'applicationsubmission_type_id' => $rec->applicationsubmission_type_id,
                    'permit_type_id' => $rec->permit_type_id,
                    'permit_name' => $rec->permit_name,
                    'port_type' => $rec->port_type,
                    'port_type_id' => $rec->port_type_id,
                    'port_of_entry' => $rec->port_of_entry,
                    'port_of_entryexit_id' => $rec->port_of_entryexit_id,
                    'customs_office_id' => $rec->customs_office_id,
                    'invoice_type' => $rec->invoice_type,
                    'invoice_type_id' => $rec->invoice_type_id,
                    'final_destination_country_id' => $rec->final_destination_country_id,
                    'final_destination_country' => $rec->final_destination_country,
                    'invoice_number' => $rec->invoice_number,
                    'invoice_date' => formatDaterpt($rec->invoice_date),
                    'importer_exporter_name' => $rec->importer_exporter_name,
                    'action' => $rec->action,
                    'currency_name' => $rec->currency_name,
                    'declaration' => $rec->declaration,
                    'declaration_statuses_id' => $rec->declaration_statuses_id,
                    'currency_oftransaction_id' => $rec->currency_oftransaction_id,
                    'mode_of_transport_id' => $rec->mode_of_transport_id,
                    'mode_of_transport' => $rec->mode_of_transport,
                    'total_invoice_value' => $rec->total_invoice_value,
                    'date_of_application' => formatDaterpt($rec->date_of_application),
                    'expected_date_of_shipment' => $rec->expected_date_of_shipment,
                    'tracking_no' => $rec->tracking_no,
                    'created_on' => $rec->created_on,
                    'process_id' => $rec->process_id,
                    'application_code' => $rec->application_code,
                    'reference_no' => $rec->reference_no,
                    'regulatory_subfunction_id' => $rec->regulatory_subfunction_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'created_by' => $rec->created_by,

                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );
            }

            $res = array('success' => true, 'data' => $application_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function getImportExpApplicantPermitsLoading(Request $req)
    {
        try {
            $workflowprocess_id = 1;
            $user_id = $req->user_id;

            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = 'wb_importexport_applications';
            $appworkflow_status_id = $req->appworkflow_status_id;
            $application_status_id = $req->application_status_id;
            $workflow_status_id = $req->workflow_status_id;
            $appworkflowstatus_category_id = $req->appworkflowstatus_category_id;

            $permit_product_data = array();
            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);


            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('par_permit_typecategories as t2', 't2.id', 't1.permit_type_id')
                ->leftJoin('par_port_type as t3', 't3.id', 't1.port_type_id')
                ->leftJoin('tra_permitsenderreceiver_data as t4', 't4.id', 't1.importer_exporter_id')
                ->leftJoin('par_entryexit_port as t5', 't1.port_of_entryexit_id', 't5.id')

                ->leftJoin('wb_workflowstageprocess_actions as t7', function ($join) use ($workflowprocess_id) {
                    $join->on('t1.appworkflow_status_id', '=', 't7.workflow_status_id');
                    if (validateIsNumeric($workflowprocess_id)) {
                        $join->on('t7.workflowprocess_id', '=', DB::raw($workflowprocess_id));
                    }
                    $join->on('t7.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t8', 't7.statuses_action_id', 't8.id')
                ->leftJoin('wf_workflow_statuses as t9', 't1.appworkflow_status_id', 't9.id')
                ->leftJoin('par_application_statuses as t10', 't1.application_status_id', 't10.id')
                ->leftJoin('par_permit_typecategories as t11', 't1.permit_type_id', 't11.id')
                ->leftJoin('par_currencies as t12', 't1.currency_oftransaction_id', 't12.id')
                ->leftJoin('par_mode_oftransport as t13', 't1.mode_of_transport_id', 't13.id')
                ->leftJoin('par_countries as t14', 't1.final_destination_country_id', 't14.id')
                ->leftJoin('par_invoice_types as t15', 't1.invoice_type_id', 't15.id')
                ->leftJoin('par_currencies as t16', 't1.currency_oftransaction_id', 't16.id')
                ->leftJoin('par_confirmations as t17', 't1.declaration_statuses_id', 't17.id')

                ->select('t1.*','t17.name as declaration', 't16.name as currency_name', 't15.name as invoice_type', 't14.name as final_destination_country', 't5.name as port_of_entry', 't13.name as mode_of_transport', 't12.name as currency_name', 't11.name as permit_type', 't10.name as application_status', 't8.name as action_name', 't8.iconCls as iconCls', 't8.action as action', 't2.name as permit_name', 't3.name as port_type', 't1.id', 't4.name as importer_exporter_name');

            if ($workflow_status_id != '') {
                $workflow_status = explode(',', $workflow_status_id);
                $sql->whereIn('appworkflow_status_id', $workflow_status);
            }
            if (validateIsNumeric($appworkflowstatus_category_id)) {
                $sql->where(array('t9.appworkflowstatus_category_id' => $appworkflowstatus_category_id));
            }
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }

            $actionColumnData = returnContextMenuActions($workflowprocess_id);
            //check the usres 

            $data = $sql->get();

            foreach ($data as $rec) {
                $application_data[] = array(
                    'id' => $rec->id,
                    'action_name' => $rec->action_name,
                    'iconCls' => $rec->iconCls,
                    'application_status' => $rec->application_status,
                    'permit_type_id' => $rec->permit_type_id,
                    'permit_name' => $rec->permit_name,
                    'port_type' => $rec->port_type,
                    'port_type_id' => $rec->port_type_id,
                    'port_of_entry' => $rec->port_of_entry,
                    'port_of_entryexit_id' => $rec->port_of_entryexit_id,
                    'customs_office_id' => $rec->customs_office_id,
                    'invoice_type' => $rec->invoice_type,
                    'invoice_type_id' => $rec->invoice_type_id,
                    'final_destination_country_id' => $rec->final_destination_country_id,
                    'final_destination_country' => $rec->final_destination_country,
                    'invoice_number' => $rec->invoice_number,
                    'invoice_date' => formatDaterpt($rec->invoice_date),
                    'importer_exporter_name' => $rec->importer_exporter_name,
                    'action' => $rec->action,
                    'currency_name' => $rec->currency_name,
                    'declaration' => $rec->declaration,
                    'declaration_statuses_id' => $rec->declaration_statuses_id,
                    'currency_oftransaction_id' => $rec->currency_oftransaction_id,
                    'mode_of_transport_id' => $rec->mode_of_transport_id,
                    'mode_of_transport' => $rec->mode_of_transport,
                    'total_invoice_value' => $rec->total_invoice_value,
                    'date_of_application' => formatDaterpt($rec->date_of_application),
                    'expected_date_of_shipment' => $rec->expected_date_of_shipment,
                    'tracking_no' => $rec->tracking_no,
                    'created_on' => $rec->created_on,
                    'workflowprocess_id' => $rec->workflowprocess_id,
                    'application_code' => $rec->application_code,
                    'reference_no' => $rec->reference_no,
                    'regulatory_subfunction_id' => $rec->regulatory_subfunction_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'created_by' => $rec->created_by,
                    'permit_data' => $this->getImportApplicantPermitsProductsApplication($req),
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );
            }

            $res = array('success' => true, 'data' => $application_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }


    function getImportApplicantPermitsProductsApplication(Request $req)
    {
        try {
        
            $requestData = $req->all();
            $table_name = 'wb_permit_products';
            unset($requestData['table_name']);


            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('par_si_units as t2', 't2.id', 't1.unit_of_measure_id')
                
                ->select('t1.*', 't2.name as unit_of_measure');

          

            $data = $sql->get();

            foreach ($data as $rec) {
                $permitproduct_data[] = array(
                    'id' => $rec->id,
                
                    'brand_name' =>$rec->brand_name,
                    'quantity' =>$rec->quantity,
                    'product_value' =>$rec->product_value,
                    // 'invoice_date' => formatDaterpt($rec->invoice_date),
                    
                );
            }

            $res = array('success' => true, 'data' => $permitproduct_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
}
