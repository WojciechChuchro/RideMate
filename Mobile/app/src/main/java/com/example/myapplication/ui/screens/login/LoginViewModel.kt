package com.example.myapplication.ui.screens.login

import com.example.myapplication.data.repository.Repository

class LoginViewModel {
    private val repo = Repository()
    public fun LoginAttempt(username: String,password: String ){
        if(repo.fetchLogin() == username && repo.fetchPassword() == password)
        println("zalogowano pomyslnie")
        else println("logowanie nieudane")
    }
}