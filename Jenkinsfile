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
                sh 'yarn build @villa-components/system' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'yarn @villa-components/system' 
            }
        }
    }
}