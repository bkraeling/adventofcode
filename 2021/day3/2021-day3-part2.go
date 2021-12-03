package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	input := []string{}

	file, err := os.Open("2021-day3-input.txt")
	if err != nil {
			fmt.Println(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var text_element = scanner.Text()
		input = append(input, text_element)
	}

	var oxygen_results = input
	var oxygen = ""
	oxygen_check:
	for i := 0; i < len(input[0]); i++ {
		var zero_reports = []string{};
		var one_reports = []string{};
		for _, report := range oxygen_results {
			character := report[i]
			switch character {
			case '0':
				zero_reports = append(zero_reports, report)
			case '1':
				one_reports = append(one_reports, report)
			}
		}
		// fmt.Println("At index: ", i)
		// fmt.Println("Zeroes: ", len(zero_reports))
		// fmt.Println("Ones: ", len(one_reports))
		if len(zero_reports) > len(one_reports) {
			oxygen_results = zero_reports
		} else {
			oxygen_results = one_reports
		}
		// fmt.Println("Remaining", oxygen_results)
		if len(oxygen_results) == 1 {
			oxygen = oxygen_results[0]
			break oxygen_check
		}
	}

	var co2_results = input
	var co2 = ""
	co2_check:
	for i := 0; i < len(input[0]); i++ {
		var zero_reports = []string{};
		var one_reports = []string{};
		for _, report := range co2_results {
			character := report[i]
			switch character {
			case '0':
				zero_reports = append(zero_reports, report)
			case '1':
				one_reports = append(one_reports, report)
			}
		}
		// fmt.Println("At index: ", i)
		// fmt.Println("Zeroes: ", len(zero_reports))
		// fmt.Println("Ones: ", len(one_reports))
		if len(one_reports) >= len(zero_reports) {
			co2_results = zero_reports
		} else {
			co2_results = one_reports
		}
		// fmt.Println("Remaining", co2_results)
		if len(co2_results) == 1 {
			co2 = co2_results[0]
			break co2_check
		}
	}

	fmt.Println("Oxygen binary: ", oxygen)
	fmt.Println("CO2 binary: ", co2)

	oxygen_dec, err := strconv.ParseInt(oxygen, 2, 64)  
	co2_dec, err := strconv.ParseInt(co2, 2, 64)  

	fmt.Println("Oxygen: ", oxygen_dec)
	fmt.Println("CO2: ", co2_dec)
	fmt.Println("Answer is: ", oxygen_dec * co2_dec)

	if err := scanner.Err(); err != nil {
			fmt.Println(err)
	}
}
