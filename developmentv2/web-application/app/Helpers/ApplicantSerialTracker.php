<?php

namespace App\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class ApplicantSerialTracker extends Model
{
    protected $table='wb_trackingnoprocesses_serials';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}
