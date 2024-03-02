pipeline {

    agent {

        docker {
            image 'node:21-alpine' 
            args '-u root' 
        }
    }

    stages {

        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Publish') { 
            steps {
                sh 'cd lib'
            }
            steps {

                withEnv(["TOKEN=${"80d48e28-db25-4628-9aff-bf9bca47b667"}"]) {

                    sh 'echo "//registry.npmjs.org/:_authToken=${TOKEN}" >> ~/.npmrc'
                    sh 'npm publish' 

                }
            }
        }
    }
}