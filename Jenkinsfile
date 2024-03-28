pipeline { 
    agent any 
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build') { 
            steps { 
                sh 'yarn && yarn build-all' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'yarn publish' 
            }
        }
    }
}