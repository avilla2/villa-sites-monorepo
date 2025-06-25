pipeline { 
    agent any
    options {
        skipStagesAfterUnstable()
    }
    parameters {
        string(name: 'app', defaultValue: '@villa-components/system', description: 'which app/website to deploy')
    }
    environment {
        CI                    = 'false'
        CLOUDFLARE_ACCOUNT_ID = credentials('CLOUDFLARE_ACCOUNT_ID')
        CLOUDFLARE_API_TOKEN  = credentials('CLOUDFLARE_API_TOKEN')
        REACT_APP_BACKEND_URL = 'https://api.villawebsolutions.com'
        REACT_APP_API_TOKEN   = credentials('STRAPI_API_TOKEN')
    }
    stages {
        stage('Setup Environment') {
            steps {
                sh '''
                #!/bin/bash
                source $HOME/.bashrc
                '''
            }
        }
        stage("Install") {
            steps {
                sh 'yarn install'
                sh 'echo "REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL" > villa-components/system/.env'
                sh 'echo "REACT_APP_API_TOKEN=$REACT_APP_API_TOKEN" >> villa-components/system/.env'
            }
        }
        stage('Build') { 
            steps {
                sh "yarn build ${params.app}"
            }
        }
        stage('Deploy') {
            steps {
                sh "yarn deploy ${params.app}"
            }
        }
    }
}