<?php


namespace App\Helpers;

use Illuminate\Support\Facades\DB;
use App\Helpers\SerialTracker;
use Carbon\Carbon;
class ReferencingHelper
{

    //refernces definations 
    static function generateProductReferenceNo($section_id,$classification_id,$sub_module_id){
            //Concate as TMP TRC-TMP i.e TMP-14/PF/0015
            $section_code = self::getRecordCodeNo('par_sections',$section_id);
            $classification_code = self::getRecordCodeNo('par_classifications',$classification_id);
            $year = date('Y');
            $data = array('section_id'=>$section_id,'sub_module_id'=>$sub_module_id,'year'=>$year);
            $where_state = array('year'=>$year,'section_id'=>$section_id,'sub_module_id'=>$sub_module_id);
            $rec = DB::table('wb_application_serials')
                    ->where($where_state)
                    ->first();
            if($rec){
                $last_serial_no = $rec->last_serial_no+1;
                //update the next serial 
                $data['last_serial_no'] = $last_serial_no;
                $rec = DB::table('wb_application_serials')
                    ->where($where_state)
                    ->update($data);
                
            }
            else{
                $last_serial_no = 1;
                //update the next serial 
                $data['last_serial_no'] = $last_serial_no;
                $rec = DB::table('wb_application_serials')
                    ->insert($data);
                
            }
            $last_serial_no = sprintf("%04d",$last_serial_no);
            //the format
            if($section_id == 4){
                $classification_code = 'MDR';
            }
           
            $reference_no = 'TRC-'.$year.'/'.$classification_code.'/'.$last_serial_no;
            return $reference_no;
    }
    static function getRecordCodeNo($table_name,$record_id){
        $code = '';
        $rec = DB::connection('mis')->table($table_name)->where(array('id'=>$record_id))->first();
        if($rec){
            $code = $rec->code;
        }
        return $code;
    }
    
    static function generatePharmaceuticalLicReferenceNo($section_id,$sub_module_id,$pharmaceuticallicense_type_id){
        $section_code = self::getRecordCodeNo('par_sections',$section_id);
        $pharmaceuticallicense_typecode = self::getRecordCodeNo('par_pharmaceuticallicense_types',$pharmaceuticallicense_type_id);
        $year = date('Y');
        $data = array('section_id'=>$section_id,'sub_module_id'=>$sub_module_id,'year'=>$year);
        $where_state = array('year'=>$year,'section_id'=>$section_id,'sub_module_id'=>$sub_module_id);
        $rec = DB::table('wb_application_serials')
                ->where($where_state)
                ->first();
        
        if($rec){
            $last_serial_no = $rec->last_serial_no+1;
            //update the next serial 
            $data['last_serial_no'] = $last_serial_no;
            $rec = DB::table('wb_application_serials')
                ->where($where_state)
                ->update($data);
            
        }
        else{
            $last_serial_no = 1;
            //update the next serial 
            $data['last_serial_no'] = $last_serial_no;
            $rec = DB::table('wb_application_serials')
                ->insert($data);
            
        }
        $last_serial_no = sprintf("%04d",$last_serial_no);
        //the format
        $app_code = self::returnSubmodulecode($sub_module_id);
        $reference_no = 'TRC-'.$year.'/'.$pharmaceuticallicense_typecode.$app_code.$last_serial_no;
        return $reference_no;
        
    }
    static function generatePremisesReferenceNo($regulated_productstype_id,$regulatory_subfunction_id){
        $section_code = self::getRecordCodeNo('cfg_regulated_productstypes',$regulated_productstype_id);
        $year = date('Y');
        $data = array('regulated_productstype_id'=>$regulated_productstype_id,'regulatory_subfunction_id'=>$regulatory_subfunction_id,'year'=>$year);
        $where_state = array('year'=>$year,'regulated_productstype_id'=>$regulated_productstype_id,'regulatory_subfunction_id'=>$regulatory_subfunction_id);
        $rec = DB::table('ptl_application_serials')
                ->where($where_state)
                ->first();
        
        if($rec){
            $last_serial_no = $rec->last_serial_no+1;
            //update the next serial 
            $data['last_serial_no'] = $last_serial_no;
            $rec = DB::table('ptl_application_serials')
                ->where($where_state)
                ->update($data);
            
        }
        else{
            $last_serial_no = 1;
            //update the next serial 
            $data['last_serial_no'] = $last_serial_no;
            $rec = DB::table('ptl_application_serials')
                ->insert($data);
            
        }
        $last_serial_no = sprintf("%04d",$last_serial_no);
        //the format
        $app_code = self::returnSubmodulecode($regulatory_subfunction_id);
        $reference_no = 'TRC-'.$year.'/'.$section_code.$app_code.$last_serial_no;
        return $reference_no;
        
    }
    static function generateGMPReferenceNo($section_id,$sub_module_id){
        $section_code = self::getRecordCodeNo('par_sections',$section_id);
        $app_code = self::returnSubmodulecode($sub_module_id);
        $year = date('Y');
        $data = array('section_id'=>$section_id,'sub_module_id'=>$sub_module_id,'year'=>$year);
        $where_state = array('year'=>$year,'section_id'=>$section_id,'sub_module_id'=>$sub_module_id);
        $rec = DB::table('wb_application_serials')
                ->where($where_state)
                ->first();
        
        if($rec){
            $last_serial_no = $rec->last_serial_no+1;
            //update the next serial 
            $data['last_serial_no'] = $last_serial_no;
            $rec = DB::table('wb_application_serials')
                ->where($where_state)
                ->update($data);
            
        }
        else{
            $last_serial_no = 1;
            //update the next serial 
            $data['last_serial_no'] = $last_serial_no;
            $rec = DB::table('wb_application_serials')
                ->insert($data);
            
        }
        $last_serial_no = sprintf("%04d",$last_serial_no);
        //the format
       
        $reference_no = 'TRC-'.$year.'/'.$section_code.$app_code.$last_serial_no;
        return $reference_no;

    }
    //get the sub-modules no 
    static function returnSubmodulecode($sub_module_id){
                if($sub_module_id == 1){

                    $app_code = 'PREM/REG'.'/';
                }
                else if($sub_module_id == 2){
                    $app_code = '/LIC'.'/';
                }
                else if($sub_module_id == 3){
                    $app_code = '/ALT'.'/';
                }
                else if($sub_module_id == 5){
                    $app_code = '/GMP'.'/';
                }
                else if($sub_module_id == 6){
                    $app_code = '/GMP/REN'.'/';
                }else if($sub_module_id == 39){
                    $app_code = '/GMP/WITH'.'/';
                }else if($sub_module_id == 40){
                    $app_code = '/GMP/ALT'.'/';
                }
                else{
                    $app_code = 'PREM/REG'.'/';
                }
                return $app_code;
        
    }
    //
    static function generateApplicationCode($sub_module_id, $table_name)
    {
        $last_id = 01;
        $max_details = DB::table($table_name)
            ->select(DB::raw("MAX(id) as last_id"))
            ->first();

        if (!is_null($max_details)) {
            $last_id = $max_details->last_id + 1;
        }
        $application_code =  env('APPCODE_PREFIX', '101').$sub_module_id . $last_id;
        return $application_code;
    }
    //code reference nos 
    static function generateApplicationRefNumber($ref_id, $codes_array, $year, $process_id,$user_id)
    {
        $where = array(
            'year' => $year,
            'process_id' => $process_id,
            // 'zone_id' => $zone_id
        );
        $serial_num_tracker = new SerialTracker();
        $serial_track = $serial_num_tracker->where($where)->first();
        if ($serial_track == '' || is_null($serial_track)) {
            $current_serial_id = 1;
            $serial_num_tracker->year = $year;
            $serial_num_tracker->process_id = $process_id;
            // $serial_num_tracker->zone_id = $zone_id;
            $serial_num_tracker->created_by = $user_id;
            $serial_num_tracker->last_serial_no = $current_serial_id;
            $serial_num_tracker->save();
        } else {
            $last_serial_id = $serial_track->last_serial_no;
            $current_serial_id = $last_serial_id + 1;
            $update_data = array(
                'last_serial_no' => $current_serial_id,
                'altered_by' => $user_id
            );
            $serial_num_tracker->where($where)->update($update_data);
        }
        $serial_no = str_pad($current_serial_id, 4, 0, STR_PAD_LEFT);
        $reg_year = substr($year, -2);
        $codes_array['serial_no'] = $serial_no;
        $codes_array['reg_year'] = $reg_year;
       

        // 
       
        
        $ref_number = self::generateRefNumber($codes_array, $ref_id);
        $trac_refcode =  env('TRACKREF_CODE', 'COMESA');
        $ref_number = str_replace("COMESA",$trac_refcode,$ref_number);
        return $ref_number;
    }
    
    static function generateRefNumber($codes_array, $ref_id)
    {
        $serial_format = DB::table('par_refnumbers_formats')
            ->where('id', $ref_id)
            ->value('ref_format');
        $arr = explode("|", $serial_format);
        $serial_variables = $serial_format = DB::table('par_refnumbers_variables')
            ->select('identifier')
            ->get();
        
        $serial_variables = convertStdClassObjToArray($serial_variables);
        $serial_variables = convertAssArrayToSimpleArray($serial_variables, 'identifier');
        // print_r($serial_variables);
        $ref = '';
        foreach ($arr as $code) {
            if (in_array($code, $serial_variables)) {
                isset($codes_array[$code]) ? $code = $codes_array[$code] : $code;
            }
            $ref = $ref . $code;
        }
        return $ref;
    }static function generateInvoiceNo($user_id)
    {
        $registration_year = date("Y");
		$prefix = 101;
        $qry = DB::connection('mis')->table('invoice_serials');
        $qry1 = $qry->where('registration_year', $registration_year);
        $last_serial = $qry->value('last_serial');
        if (is_numeric($last_serial) && $last_serial != '') {
            $serial_no = $last_serial + 1;
            $update_params = array(
                'last_serial' => $serial_no,
                'dola' => Carbon::now(),
                'altered_by' => $user_id
            );
            $qry1->update($update_params);
        } else {
            $serial_no = 1;
            $insert_params = array(
                'registration_year' => $registration_year,
                'last_serial' => $serial_no,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            $qry->insert($insert_params);
        }
        $serial_no = $serial_no = str_pad($serial_no, 4, 0, STR_PAD_LEFT);
        $invoice_no = $prefix.$registration_year . $serial_no;
        return $invoice_no;
    }

    
}