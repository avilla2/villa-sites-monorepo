pipeline { 
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage("Install") {
            steps {
                sh 'yarn install'
            }
        }
        stage('Build') { 
            steps { 
                sh 'yarn build-all' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'yarn publish' 
            }
        }
    }
}