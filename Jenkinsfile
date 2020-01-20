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
                if (env.JOB_BASE_NAME == 't-web') {
                    echo '[Building PROD]...'
                    sh "docker-compose -p ${JOB_BASE_NAME} -f docker-compose-prod.yml build"
                } else {
                    echo '[Building DEV]...'
                    sh "docker-compose -p ${JOB_BASE_NAME} build"
                }
                echo '...[Building]'
            }
        }
        stage('Deploy') {
            steps {
                if (env.JOB_BASE_NAME == 't-web') {
                    echo '[Deploying PROD]...'
                    sh "docker-compose -p ${JOB_BASE_NAME} -f docker-compose-prod.yml up -d"
                } else {
                    echo '[Deploying DEV]...'
                    sh "docker-compose -p ${JOB_BASE_NAME} up -d"
                }
                echo '...[Deploying]'
            }
        }
    }
}
