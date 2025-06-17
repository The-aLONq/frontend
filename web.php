<?php

use App\Http\Controllers\TestCaseController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TestCaseController::class,'index'])->name('test-case');
Route::get('/get',[TestCaseController::class,'getData'])->name('test-case.get');
Route::post('/check',[TestCaseController::class,'checkData'])->name('test-case.check');
