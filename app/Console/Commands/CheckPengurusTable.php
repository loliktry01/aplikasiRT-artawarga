<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CheckPengurusTable extends Command
{
    protected $signature = 'check:pengurus-table';
    protected $description = 'Check the structure of pengurus table';

    public function handle()
    {
        $columns = Schema::getColumnListing('pengurus');
        $this->info('Columns in pengurus table:');
        foreach ($columns as $column) {
            $this->line("- {$column}");
        }
    }
}