pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
                sh 'yarn && yarn build-all' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'yarn deploy-all' 
            }
        }
    }
}