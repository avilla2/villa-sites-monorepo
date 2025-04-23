pipeline { 
    agent any
    options {
        skipStagesAfterUnstable()
    }
    environment {
        CLOUDFLARE_ACCOUNT_ID = credentials('CLOUDFLARE_ACCOUNT_ID')
        CLOUDFLARE_API_TOKEN  = credentials('CLOUDFLARE_API_TOKEN')
        REACT_APP_BACKEND_URL = 'https://api.villawebsolutions.com'
        REACT_APP_API_TOKEN   = credentials('STRAPI_API_TOKEN')
    }
    stages {
        stage("Install") {
            steps {
                sh 'yarn install'
                sh 'echo "REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL" > villa-components/system/.env'
            }
        }
        stage('Build') { 
            steps { 
                sh 'yarn build @villa-components/system' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'yarn deploy @villa-components/system' 
            }
        }
    }
}