package com.example.myapplication.ui.screens.mainScreen

import androidx.lifecycle.ViewModel
import com.example.myapplication.data.repository.Repository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlin.concurrent.fixedRateTimer

class MainViewModel : ViewModel(){
    private val repo = Repository()
    private val _modelData = MutableStateFlow(0)
    var modelData = _modelData.asStateFlow()

    init{
        makeNetworkRequestPeriodic()
    }
    private fun makeNetworkRequestPeriodic(){
        fixedRateTimer(period = 1000L){
            //val randomNumber =  repo.fetchData()
            //_modelData.update { randomNumber }
        }
    }
}