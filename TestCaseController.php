<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class TestCaseController extends Controller
{
    public function index(Request $request)
    {
        return view('index');
    }
    public function getData()
    {
        $data = file_get_contents('');

        if ($data)
        {
            $data = json_decode($data) -> value;
        }

        return redirect()
        ->route('test-case')
        ->with('value', $data);
    }
    public function checkData(Request $request)
    {
        $value = $request->input('value');

        if(preg_match('/^[А-Яа-яЁё]+ [А-Яа-яЁё]+ [А-Яа-яЁё]+$/u', $value))
        {
            return redirect()
            ->route('test-case')
            ->with('value', $value)
            ->with('message', 'ФИО Корректно');
        } else {
            return redirect()
            ->route('test-case')
            ->with('value', $value)
            ->with('message', 'ФИО содержит некорректные символы');
        }
    }

}
