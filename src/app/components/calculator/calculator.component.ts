import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../domain/services/calculator.service';
import { FormGroup, FormControl } from '@angular/forms';

enum Operation {
  Add = 0,
  Subtract = 1,
  Multiply = 2,
  Divide = 3
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  inputStr: any;
  displayValue: string = '0';
  calculationHistory: string[] = [];

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.inputStr = new FormGroup({
      text: new FormControl()
    });
  }

  buttonClick(buttonElement: any) {
    let buttonText = buttonElement.textContent.trim();


    if (this.inputStr.controls.text.value != null) {
      this.inputStr.controls.text.setValue(this.inputStr.controls.text.value + buttonText);
      let operation: Operation | undefined;
      switch (buttonText) {
        case '+':
          operation = Operation.Add;
          break;
        case '-':
          operation = Operation.Subtract;
          break;
        case '/':
          operation = Operation.Divide;
          break;
        case '*':
          operation = Operation.Multiply; // Treat multiply as division for simplicity
      }
    } else {
      this.inputStr.controls.text.setValue(buttonText);
    }

  }



  clearDisplay() {
    this.inputStr.controls.text.setValue('');
  }

  calculate() {
    let result = eval(this.inputStr.controls.text.value);
    this.inputStr.controls.text.setValue(result);
  }

  performCalculation(operation: Operation) {
    const expression = this.inputStr.controls.text.value;
    const expressionParts = expression.split(/(\+|\-|\*|\/)/);
    console.log(expressionParts)

    if (expressionParts.length !== 3) {
      console.error('Invalid expression:', expression);
      return;
    }

    const operand_A = parseFloat(expressionParts[0]);
    const operatorString = expressionParts[1];
    const operand_B = parseFloat(expressionParts[2]);

    if (isNaN(operand_A) || isNaN(operand_B)) {
      console.error('Invalid operands', expression);
      return;
    }

    let operator: Operation | undefined;
    switch (operatorString) {
      case '+':
        operator = Operation.Add;
        break;
      case '-':
        operator = Operation.Subtract;
        break;
      case '*':
        operator = Operation.Multiply;
        break;
      case '/':
        operator = Operation.Divide;
        break;
      default:
        console.error('Invalid operator:', operatorString);
        return;
    }

    const requestData = {
      operand_A: operand_A,
      operand_B: operand_B,
      operation: operator
    };

    this.calculatorService.calculate(requestData).subscribe(
      (response) => {
        const operatorSymbol = this.getOperatorSymbol(operation);
        this.displayValue = response.results.toString();
        this.calculationHistory.unshift(`${operand_A} ${operatorSymbol} ${operand_B} = ${response.results}`);
        this.calculate();
      },
      (error) => {
        console.error('Error occurred while performing calculation:', error);
      }
    );
  }

  getOperatorSymbol(operation: Operation): string{
    switch (operation) {
      case Operation.Add:
        return '+';
      case Operation.Subtract:
        return '-';
      case Operation.Multiply:
        return '*';
      case Operation.Divide:
        return '/';
      default:
        return '';
    }
  }

  retrieveCalculationHistory() {
    this.calculatorService.getHistory().subscribe(
      (response) => {
        this.calculationHistory = response;
      },
      (error) => {
        console.error('Error occurred while retrieving calculation history:', error);
      }
    );
  }

  clearCalculationHistory(){
    this.calculationHistory = [];
  }

}
