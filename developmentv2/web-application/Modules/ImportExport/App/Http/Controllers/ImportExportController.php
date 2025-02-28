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

            // $regulatory_function_id = getSingleRecordColValue('par_regulatory_subfunctions', array('id' => $req->regulatory_subfunction_id), 'regulatory_function_id');

            $regulatory_function_id = 1;

            $app_data = array(
                'trader_id' => $trader_id,
                'local_agent_id' => $local_agent_id,
                'application_code' => $req->application_code,
                'applicant_application_code' => $req->applicant_application_code,
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
                        't1.id', 't1.name as applicant_name', 't1.contact_person', 
                        't1.tin_no', 't1.country_id as country_id', 't1.region_id as region_id',
                        't1.district_id as district_id', 't4.name as district_name', 't3.name as region_name', 
                        't1.physical_address', 't1.postal_address', 't1.telephone_no as telephone_no', 
                        't1.fax as fax', 't1.email_address', 't1.website as website'
                    )
                    ->when($search_value, fn($query) => 
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
    
    
    
}
