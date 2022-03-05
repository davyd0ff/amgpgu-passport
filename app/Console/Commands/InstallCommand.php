<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Инсталляция проекта';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->call('project:clear');

        $this->call('migrate');

        $this->call('db:seed');

        $this->call('storage:link');

        $this->call('passport:keys', [
            '--force' => true
        ]);

        // todo think: А нужен ли personal-client?
        $this->call('passport:client', [
            '--personal' => true,
            '--name' => config('app.name') . 'Personal Client'
        ]);

        $this->call('passport:client', [
            '--password' => true,
            '--name' => '1C_University_Client',
            '--provider' => 'users'
        ]);

        // $this->call('passport:client', [
        //     ''
        // ])

        return 0;
    }
}
