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


    public function saveOgaImportExportApplication(Request $req)
    {
        try {
            DB::beginTransaction();
            $application_id = $req->application_id;

            $product_type_id = $req->product_type_id;
            $trader_initiator_id = $req->trader_id;
            $applicant_id = $req->trader_id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;

            $local_agent_id = $req->local_agent_id;

            $reference_no = $req->reference_no;
            $regulatory_subfunction_id = $req->regulatory_subfunction_id;
            $zone_id = $req->zone_id;
            $process_id = $req->process_id;
            $id = $req->id;
            $product_res = '';

            $regulatory_function_id = 1;

            $app_data = array(
                'trader_id' => $trader_id,
                'local_agent_id' => $local_agent_id,
                'application_code' => $req->application_code,
                // 'oga_application_code' => $req->oga_application_code,
                'regulatory_subfunction_id' => $req->regulatory_subfunction_id,
                'application_id' => $application_id,
                'regulatory_function_id' => $regulatory_function_id,
                'product_type_id' => $req->product_type_id,
                'zone_id' => $req->zone_id,
                'reference_no' => $reference_no,
                'paying_currency_id' => $req->paying_currency_id,
                'application_status_id' => 1,
                'process_id' => $process_id,
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
                    'trader_initiator_id' => $trader_initiator_id,
                    'applicant_id' => $applicant_id,
                );

                $resp = insertRecord('tra_application_documentsdefination', $product_infor, $email_address);

                $product_res = $resp;

                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('regulatory_function_id' => $regulatory_function_id), 'reference_format_id');
                // print_r('Hello: ' . $ref_id);
                // exit;

                $zone_code = getSingleRecordColValue('par_zones', array('id' => $req->zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_regulated_productstypes', array('id' => $req->product_type_id), 'code');
                $class_code = getSingleRecordColValue('par_classifications', array('id' => $req->classification_id), 'code');
                $process_id = getSingleRecordColValue('wf_processes', array('id' => $id,), 'id');

                if ($class_code == '') {
                    $class_code = $section_code;
                }
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
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
                    $response = insertRecord('tra_importexport_applications', $tra_app_data, $email_address);


                    if ($response['success']) {
                        $res = array(
                            'tracking_no' => $tracking_no,
                            'application_id' => $application_id,
                            'regulatory_function_id' => $regulatory_function_id,
                            'application_code' => $application_code,
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
            $application_id = $req->application_id;
            $applicant_id = $req->applicant_id;
            $product_type_id = $req->product_type_id;
            $trader_initiator_id = $req->trader_id;
            $applicant_id = $req->trader_id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;

            $local_agent_id = $req->local_agent_id;

            $reference_no = $req->reference_no;
            $regulatory_subfunction_id = $req->regulatory_subfunction_id;
            $zone_id = $req->zone_id;
            $process_id = $req->process_id;
            $id = $req->id;
            $product_res = '';

            // $regulatory_function_id = getSingleRecordColValue('par_regulatory_subfunctions', array('id' => $req->regulatory_subfunction_id), 'regulatory_function_id');

            $regulatory_function_id = 1;

            $app_data = array(
                'trader_id' => $trader_id,
                'local_agent_id' => $local_agent_id,
                'application_code' => $req->application_code,
                'applicant_application_code' => $req->applicant_application_code,
                'regulatory_subfunction_id' => $req->regulatory_subfunction_id,
                'application_id' => $application_id,
                'applicant_id' => $req->applicant_id,
                'regulatory_function_id' => $regulatory_function_id,
                'product_type_id' => $req->product_type_id,
                'zone_id' => $req->zone_id,
                'reference_no' => $reference_no,
                'currency_oftransaction_id' => $req->currency_oftransaction_id,
                'application_status_id' => 1,
                'process_id' => $process_id,
                'document_upload_id' => $req->document_upload_id,
                'application_type_id' => $req->application_type_id,
                'application_reference_number' => $req->application_reference_number,
                'applicant_type_id' => $req->applicant_type_id,
                'permit_type_id' => $req->permit_type_id,
                'date_of_application' => Carbon::now(),
                'expected_date_of_shipment' => $req->expected_date_of_shipment,
                'importer_exporter_id' => $req->importer_exporter_id,
                'port_type_id' => $req->port_type_id,
                'port_of_entryexit_id' => $req->port_of_entryexit_id,
                'customs_office' => $req->customs_office,
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
                $process_id = getSingleRecordColValue('wf_processes', array('id' => $id,), 'id');

                if ($class_code == '') {
                    $class_code = $section_code;
                }
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
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
                $tra_application_code = generateApplicationCode($regulatory_subfunction_id, 'tra_importexport_applications');

                $application_id = $resp['record_id'];

                $app_data['created_by'] = $email_address;
                $app_data['created_on'] = Carbon::now();
                $app_data['tracking_no'] = $tracking_no;
                $app_data['reference_no'] = $tracking_no;
                $app_data['process_id'] = $process_id;

                $app_data['regulatory_function_id'] = $regulatory_function_id;

                $app_data['date_added'] = Carbon::now();
                $app_data['application_code'] = $application_code;
                $app_data['application_code'] = $tra_application_code;



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
                        'application_code' => $application_code,
                        // 'process_id' => $process_id,
                        'success' => true,
                        'message' => 'Application Saved Successfully, with Tracking No:' . $tracking_no
                    );

                    $response = insertRecord('tra_importexport_applications', $app_data, $email_address);

                    if ($response['success']) {
                        $res = array(
                            'tracking_no' => $tracking_no,
                            'application_id' => $application_id,
                            'regulatory_function_id' => $regulatory_function_id,

                            'application_code' => $application_code,
                            // 'process_id' => $process_id,
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
                $res =  array(
                    'success' => true,
                    'record_id' => $record_id,
                    'message' => 'Saved Successfully'
                );
            } else {
                $res =  array(
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
                    $res =  array(
                        'success' => true,
                        'record_id' => $record_id,
                        'message' => 'Saved Successfully'
                    );
                } else {
                    $res =  array(
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
                    $res =  array(
                        'success' => true,
                        'record_id' => $record_id,
                        'message' => 'Saved Successfully'
                    );
                } else {
                    $res =  array(
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
                $where = array('name' => $manufacturer_name,
                    'physical_address' => $physical_address);
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

                $res = array('success' => true,
                    'manufacturer_id' => $manufacturer_id,
                    'manufacturer_name' => $manufacturer_name,
                    'physical_address' => $physical_address,
                    'message' => 'Saved Successfully');

            } else {
                $res = array('success' => false,
                    'message' => $resp['message']);

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
                    't4.name as district_name',
                    't3.name as region_name',
                    't1.physical_address',
                    't1.postal_address',
                    't1.telephone_no as telephone_no',
                    't1.fax as fax',
                    't1.email_address',
                    't1.website as website'
                )
                ->when(
                    $search_value,
                    fn($query) =>
                    $query->where('t1.name', 'LIKE', "%{$search_value}%")
                )
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

            $is_local_agent = $req->is_local_agent;
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
                ->when(
                    $search_value,
                    fn($query) =>
                    $query->where('t1.name', 'LIKE', "%{$search_value}%")
                )
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
            $searchValue = $req->searchValue ?? '';

            if (!empty($searchValue) && $searchValue !== 'undefined') {
                $searchValue = explode(',', $searchValue);
                $search_value = $searchValue[2] ?? '';
            }

            $is_local_agent = $req->is_local_agent;
            $data = collect();
            $totalCount = 0;

            $data = DB::table('wb_permit_products as t1')
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
                ->when(
                    $search_value,
                    fn($query) =>
                    $query->where('t1.name', 'LIKE', "%{$search_value}%")
                )
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


    public function getImportExpPermitsApplicationLoading(Request $req)
    {
        try {
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
            $regulatory_subfunction_id = $req->regulatory_subfunction_id;

            $application_status_ids = explode(',',  $application_status_id);
            $sub_module_ids = explode(',',  $regulatory_subfunction_id);
            //  $regulatory_subfunction_id = $req->regulatory_subfunction_id;
            $product_type_id = $req->product_type_id;
            $application_code = $req->application_code;
            $permit_type_id = $req->permit_type_id;

            $data = array();
            //get the records 
            $records = DB::table('tra_importexport_applications as t1')
                ->select('t1.*', 't7.name as action_name', 't7.iconCls', 't7.action', 't3.name as status', 't3.name as status_name', 't4.router_link', 't4.name as process_title')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id', '=', 't3.id')
                ->leftJoin('wb_processes as t4', function ($join) {
                    $join->on('t1.regulatory_subfunction_id', '=', 't4.regulatory_subfunction_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
                ->leftJoin('tra_processstatus_actions as t6', function ($join) {
                    $join->on('t1.application_status_id', '=', 't6.status_id')
                        ->on('t6.is_default_action', '=', DB::raw(1));
                })
                ->leftJoin('wb_statuses_actions as t7', 't6.action_id', 't7.id')

                ->orderBy('t1.date_added', 'desc');
            if (validateIsNumeric($trader_id)) {
                if ($trader_id != 25) {
                    $records->where(array('t1.trader_id' => $trader_id));
                }
            }

            if (is_array($application_status_ids) && count($application_status_ids) > 0 && $application_status_id != '') {

                $records =  $records->whereIn('t1.application_status_id', $application_status_ids);
            }
            if (is_array($sub_module_ids) && count($sub_module_ids) > 0 && $regulatory_subfunction_id != '') {

                $records =  $records->whereIn('t1.regulatory_subfunction_id', $sub_module_ids);
            }

            if (validateIsNumeric($regulatory_subfunction_id)) {
                $records =  $records->where(array('t1.regulatory_subfunction_id' => $regulatory_subfunction_id));
            }

            if (validateIsNumeric($product_type_id)) {
                $records =  $records->where(array('t1.product_type_id' => $product_type_id));
            }
            if (validateIsNumeric($permit_type_id)) {
                $records->where(array('t1.regulatory_subfunction_id' => 12));
            }
            //the ilters 

            if (validateIsNumeric($application_code)) {

                $records =  $records->where(array('t1.application_code' => $application_code));
                $data = $records->get();

                $data = $this->getSinglePermitApplications($data);
            } else {

                //$records = $records->get();
                $records = $records->groupBy('t1.application_code')->get();
                $data = $this->getPermitApplications($records);
            }
            // $data = $this->getPermitApplications($records);
            $res = array('success' => true, 'data' => $data);
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


    // getImportExpPermitsApplicationLoading



    public function getImportExpApplicantPermitsLoading(Request $req)
    {
        try {
            $process_id = $req->process_id;
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

                ->leftJoin('wf_workflowstatuses_actions as t7', function ($join) use ($process_id) {
                    $join->on('t1.appworkflow_status_id', '=', 't7.workflow_status_id');
                    if (validateIsNumeric($process_id)) {
                        $join->on('t7.process_id', '=', DB::raw($process_id));
                    }
                    $join->on('t7.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t8', 't7.statuses_action_id', 't8.id')
                ->leftJoin('wf_workflow_statuses as t9', 't1.appworkflow_status_id', 't9.id')
                ->select('t1.*',  't8.name as action_name', 't5.name as reporting_quarter', 't8.iconCls as iconcls', 't8.action', 't2.name as permit_name', 't3.name as port_type', 't1.id');
                
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

            $actionColumnData = returnContextMenuActions($process_id);
            //check the usres 
           
            $data = $sql->get();

            foreach ($data as $rec) {
                $permit_product_id = $rec->id;
                $application_data[] = array(
                    'id' => $rec->id,
                    'action_name' => $rec->action_name,
                    'iconcls' => $rec->iconcls,
                    'action' => $rec->action,
                    'date_of_application' => formatDaterpt($rec->date_of_application),
                    'created_on' => $rec->created_on,
                    'process_id' => $rec->process_id,
                    'application_code' => $rec->application_code,
                    'reference_no' => $rec->reference_no,
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
}
