<?php

namespace App\Helpers;
use GuzzleHttp\Client;

class AuthHelper {

    static function generateUniqID() {
        $uuid = substr( md5( uniqid( rand(), TRUE ) ), 0, 19 );
        return $uuid;
    }

    static function generatePwdSaltOnRegister( $username ) {
        $uuid = self::generateUniqID();
        $salt = sha1( $username . $uuid );
        return $salt;
    }

    static function generatePwdSaltOnLogin( $username, $uuid ) {
        $salt = sha1( $username . $uuid );
        return $salt;
    }

    static function hashPwd( $username, $uuid, $pwd ) {
        $salt = self::generatePwdSaltOnLogin( $username, $uuid );
        $hashed_pwd = crypt( $pwd, "$6$".$salt );
        return $hashed_pwd;
    }

    static function hashPwdOnRegister( $username, $pwd ) {
        $salt = self::generatePwdSaltOnRegister( $username );
        $hashed_pwd = crypt( $pwd, "$6$".$salt );
        return $hashed_pwd;
    }

    static function hashPwdOnLogin( $username, $uuid, $pwd ) {
        $salt = self::generatePwdSaltOnLogin( $username, $uuid );
        $hashed_pwd = crypt( $pwd, "$6$".$salt );
        return $hashed_pwd;
    }

    static function createFaveoUser( $name, $email, $password, $helpdesk_role_id ) {
        $client = new Client();
        $helpdesk_url = env( 'helpdesk_url' );
        $faveo_api_token = env( 'faveo_api_token' );
        $response = $client->post( $helpdesk_url.'/api/user', [
            'headers' => [
                'Authorization' => 'Bearer ' . $faveo_api_token, // Use admin API token
                'Accept' => 'application/json'
            ],
            'form_params' => [
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'role' => $helpdesk_role_id, // 3 = Client, 2 = Agent, 1 = Admin
            ]
        ] );
        $helpdesk_user_id = $data[ 'user' ][ 'id' ] ?? null;
        // Extract and return the user ID
        //return json_decode( $response->getBody(), true );
        return $helpdesk_user_id;
    }
    static function loginFaveoUser( $email, $password ) {
        $client = new Client();
        $helpdesk_url = env( 'helpdesk_url' );
        $faveo_api_token = env( 'faveo_api_token' );
        $response = $client->post( $helpdesk_url.'/api/auth', [
            'form_params' => [
                'email' => $email,
                'password' => $password
            ]
        ] );

        $data = json_decode( $response->getBody(), true );

        if ( $token ) {
            $helpdesk_url = $helpdesk_url.'/login?token=' . $token;

        }
        return $helpdesk_url;
    }

    static function updateFaveoPassword( $helpdesk_user_id, $newPassword ) {
        $client = new Client();

        $helpdesk_url = env( 'helpdesk_url' );

        $faveo_api_token = env( 'faveo_api_token' );
        $response = $client->put( $helpdesk_url."/api/user/$helpdesk_user_id", [
            'headers' => [
                'Authorization' => 'Bearer ' . $faveo_api_token, // Use an admin API token
                'Accept' => 'application/json'
            ],
            'form_params' => [
                'password' => $newPassword,
            ]
        ] );

        return json_decode( $response->getBody(), true );
    }
    static function getFaveoUserDetails( $email ) {
        $client = new Client();
        $helpdesk_url = env( 'helpdesk_url' );
        $faveo_api_token = env( 'faveo_api_token' );
        $response = $client->get( $helpdesk_url.'/api/user', [
            'headers' => [
                'Authorization' => 'Bearer ' . $faveo_api_token,
                'Accept' => 'application/json'
            ],
            'query' => [
                'email' => $email
            ]
        ] );

        $data = json_decode( $response->getBody(), true );
        $user_datadetails = $data[ 'user' ] ?? null;
        return $user_datadetails;
    }

}