pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo '[Checkout]...'
                sh 'printenv'
                echo '...[Checkout]'
            }
        }
        stage('Build') {
            steps {
                echo '[Building]...'
                sh "docker-compose -p ${JOB_BASE_NAME} build"
                echo '...[Building]'
            }
        }
        stage('Deploy') {
            steps {
                echo '[Deploying]....'
                sh "docker-compose -p ${JOB_BASE_NAME} up -d"
                echo '...[Deploying]'
            }
        }
    }
}
