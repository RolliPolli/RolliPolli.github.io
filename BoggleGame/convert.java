// I had to write this program to convert the dictionary to the right format for a JS array

import java.util.Scanner;  
import java.io.File;  
import java.io.*;  
public class convert 
{  
		public static void main(String args[])throws FileNotFoundException {

			File filename = new File("words.txt");
			Scanner scan = new Scanner(filename);
			while (scan.hasNextLine()){
				System.out.println("\""+scan.nextLine()+"\",");

			}

		}

}