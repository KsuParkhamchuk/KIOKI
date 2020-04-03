import java.io.*;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class PJW {

    private static File input = new File("input.txt");
    private static File output = new File("output.txt");

    public static void main(String[] args) throws IOException {

        int n = 0;
        Scanner sc = new Scanner(input);
        List<Integer> list = new ArrayList<>();

        while(sc.hasNext()){
            n = PJW32Hash(sc.nextLine());
            list.add(n);
        }
        BufferedWriter bw = new BufferedWriter(new FileWriter(output));
        System.out.println("Output values:\n");
        for(int j = 0; j<list.size();j++){
            bw.write(Integer.toHexString(list.get(j)) + "\n");
            System.out.println(Integer.toHexString(list.get(j)) + "\n");
        }
        bw.close();

    }

    public static int PJW32Hash(String input) {
        int hash = 0;
        for(int i=0; i<input.length();i++)
        {
            byte byte_of_data = (byte) input.charAt(i);
            hash = (hash << 4) + byte_of_data;
            int h1 = hash & 0xf0000000;
            if (h1 != 0) {
                hash = ((hash ^ (h1 >> 24)) & (0xfffffff));
            }
        }
        return hash;
    }

    public static String byteToHex(int num) {
        char[]hexDigits = new char[2];
        hexDigits[0]= Character.forDigit((num >> 4) & 0xF, 16);
        hexDigits[1]= Character.forDigit((num & 0xF), 16);
        return new String(hexDigits);
    }




}
