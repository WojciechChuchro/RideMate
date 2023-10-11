package com.example.myapplication.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun MyButton(onClick: () -> Unit, text: String) {
    Button(
        onClick = onClick,
        contentPadding = PaddingValues(16.dp),
    ) {
        Text(text = text)
    }
}