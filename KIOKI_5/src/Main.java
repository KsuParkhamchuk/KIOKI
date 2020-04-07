import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private static final int p=11;
    private static final int q=17;
    private static final int H0=31;
    private static String message = "РОССИЯ"; //Исходное сообщение
    private static String mesage = "РАДОН"; // Сообщение для проверки


    public static void main(String[] args) {
        Map<String,Integer> keys = generateKeys(p,q); // Вычисляем открытый и закрытый ключи
        int s = signature(keys); // Подпись сообщения
        System.out.println(check(message, s, keys.get("e"))); // Действительна ли подпись
    }

    public static Map<String,Integer> generateKeys(int p, int q){
        int r = p*q;
        int fi = (p-1)*(q-1);
        int e = findExp(fi);
        int d = calcClosedExp(fi,e);
        Map<String,Integer> map = new HashMap<>();
        map.put("e",e);
        map.put("d",d);
        System.out.println("r="+ r + "\nfi="+ fi + "\nd=" + d + "\nOpen key:("+ e + "," + r + ")\nClosed key:(" + d + "," + r + ")");
        return map;
    }
    // Подпись сообщения
    public static int signature(Map<String,Integer> keys){
        int[] messageCode = messageCode(message);
        int m = calculateHashView(H0,messageCode);
        int s = signMessage(m, keys.get("d"));
        String mc = Arrays.toString(messageCode);
        System.out.println("Int array message: "+mc);
        System.out.println("Signature:" + s);
        return s;
    }

    public static boolean check(String message, int s, int e){

        int[] messageCode = messageCode(message);//Перевод проверяемого сообщения в массив чисел, если сообщение не совпадает с исходным выводится false
        int m = calculateHashView(H0, messageCode);
        int myS = signMessage(s,e);
        if (m == myS){
            return true;
        }
        else {
            return false;
        }
    }
    //Вычисление открытой экспоненты
    public static int findExp(int fi){
        int res = 0;
        for(int i = 4;i<fi;i++){
            if(gcd(fi,i)==1){
                res = i;
                System.out.println("e:"+res);
               break;
            }
        }
        return res;
    }
    //НОД
    public static int gcd(int p, int q) {
        if (q == 0) return p;
        else return gcd(q, p % q);
    }
    //Вычисление закрытой экспоненты
    public static int calcClosedExp(int fi, int e){
        int temp = 0;
        int d = 0;
        while (temp%fi != 1){
            d++;
            temp = d*e;
        }
        return d;
    }
    //Перевод исходного сообщения в массив чисел
    public static int[] messageCode(String message){
        message.toLowerCase();
        int[] messageCode = new int[message.length()];
        for (int i = 0; i < message.length(); i++) {
            Character c = message.charAt(i);

            if(c.hashCode() == 32) {
                messageCode[i] = 1;
            }
            if (c.hashCode() == 1046){
                messageCode[i] = 7;
            } else
            if (c.hashCode()>1046){
                messageCode[i] = c.hashCode() - 1037;
            }
            else {
                messageCode[i] = c.hashCode() - 1038;
            }
        }

        return messageCode;
    }
    //Вычисление хэш-значения
    public static int calculateHashView(int h0,int[] messageCode){
        int h = h0;
        for (int i = 0; i < messageCode.length; i++) {
            h = (int) (Math.pow((h+messageCode[i]),2)%(p*q));
        }
        return h;
    }
    //Вычисление цифровой подписи
    public static int signMessage(int m,int d){
        BigDecimal mB = BigDecimal.valueOf(m);
        BigDecimal pow = mB.pow(d);
        BigDecimal i = (pow.remainder (BigDecimal.valueOf(p * q)));
        return i.intValue();
    }
}
