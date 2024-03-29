pipeline { 
    agent { 
        docker { 
            image 'node:18.20.0-alpine' 
        } 
    }
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