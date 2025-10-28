package co.icesi.buscaminas;

import co.icesi.buscaminas.controllers.TCPController;
import co.icesi.buscaminas.model.BoardGame;
import co.icesi.buscaminas.services.ServicesImpl;

import java.util.Scanner;

public class Main {

    public static void main(String[] args)
    {
        ServicesImpl serv = new ServicesImpl();
        new Thread(() -> apply(serv.getGame())).start();
        TCPController controller = new TCPController(serv);
        controller.startService();
    }
    public static void apply(BoardGame bg) {

        int n = bg.getBoard().length;
        int m = bg.getBoard()[0].length;
        System.out.println("LandMines on the table: "+ bg.getMines());
//        bg.showAll(true);
//        bg.printBoard();
//        bg.showAll(false);
        bg.printBoard();
        Scanner scanner = new Scanner(System.in);
        System.out.println("select a cell (i,j) between 0 and "+(n-1)+","+(m-1)+" to play, or (-1,-1) to exit");
        System.out.println("you have "+bg.getMines()+" mines to avoid");
        System.out.println("use the format: <operation> <i> <j>");
        System.out.println("operation 1: select cell, operation 2: mark/unmark cell");
        int operation = scanner.nextInt();
        int i = scanner.nextInt();
        int j = scanner.nextInt();
        do{
            try {
                if(operation==2){
                    bg.markCell(i,j);
                }else if(operation ==1){
                    boolean r = bg.selectCell(i, j);
                    if (r) {
                        System.out.println("you win, Congratulations");
                        break;
                    }
                }
                bg.printBoard();
            }catch (RuntimeException e){
                System.out.println(e.getMessage());
                break;
            }
            operation = scanner.nextInt();
            i = scanner.nextInt();
            j = scanner.nextInt();
        }while (i>=0 && j>=0);
        bg.showAll(true);
        bg.printBoard();
        System.out.println("exit");
        scanner.close();

    }
}