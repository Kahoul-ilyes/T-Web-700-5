pipeline {
    agent any

    stages {

        stage('Environment') {
            steps {
                echo '[Environment]...'
                sh 'printenv'
                echo '...[Environment]'
            }
        }
        stage('Build') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo '[Building PROD]...'
                        sh "docker-compose -p production -f docker-compose-prod.yml build"
                    } else {
                        echo "[Building ${JOB_BASE_NAME}]..."
                        sh "docker-compose -p ${JOB_BASE_NAME} build"
                    }
                    echo "...[Building ${JOB_BASE_NAME}]"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo '[Deploying PROD]...'
                        sh "docker-compose -p production -f docker-compose-prod.yml up -d"
                    } else if (env.BRANCH_NAME == 'develop') {
                        echo '[Deploying DEV]...'
                        sh "docker-compose -p ${JOB_BASE_NAME} up -d"
                    }
                    echo '...[Deploying]'
                }
            }
        }
    }
}
