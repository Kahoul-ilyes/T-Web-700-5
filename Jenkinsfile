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
                script {
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
        }
        stage('Deploy') {
            steps {
                script {
                    if (env.JOB_BASE_NAME == 't-web') {
                        echo '[Building PROD]...'
                        sh "docker-compose -p ${JOB_BASE_NAME} -f docker-compose-prod.yml up -d"
                    } else {
                        echo '[Building DEV]...'
                        sh "docker-compose -p ${JOB_BASE_NAME} up -d"
                    }
                    echo '...[Building]'
                }
            }
        }
    }
}
