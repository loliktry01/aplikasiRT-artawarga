<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiDocsPassword
{
    public function handle(Request $request, Closure $next)
    {
        $password = 'scrumble123'; // GANTI dengan passwordmu

        if ($request->session()->get('api_docs_access') !== true) {
            return redirect()->route('docs.password.form');
        }

        return $next($request);
    }
}
