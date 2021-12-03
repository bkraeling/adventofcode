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

	var gamma = ""
	var epsilon = ""
	for i := 0; i < len(input[0]); i++ {
		var zeroes = 0;
		var ones = 0;
		for _, report := range input {
			character := report[i]
			switch character {
			case '0':
				zeroes = zeroes + 1
			case '1':
				ones = ones + 1
			}
		}
		// fmt.Println("At index: ", i)
		// fmt.Println("Zeroes: ", zeroes)
		// fmt.Println("Ones: ", ones)
		if zeroes > ones {
			gamma = gamma + string('0')
			epsilon = epsilon + string('1')
		} else {
			gamma = gamma + string('1')
			epsilon = epsilon + string('0')
		}
	}

	fmt.Println("Gamma binary: ", gamma)
	fmt.Println("Epsilon binary: ", epsilon)

	gamma_dec, err := strconv.ParseInt(gamma, 2, 64)  
	episilon_dec, err := strconv.ParseInt(epsilon, 2, 64)  

	fmt.Println("Gamma: ", gamma_dec)
	fmt.Println("Epsilon: ", episilon_dec)
	fmt.Println("Answer is: ", gamma_dec * episilon_dec)

	if err := scanner.Err(); err != nil {
			fmt.Println(err)
	}
}
