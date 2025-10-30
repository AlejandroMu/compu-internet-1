package co.icesi.buscaminas.model;

import java.util.Random;

public class BoardGame {

    private Cell[][] board;

    private int mines;

    public int getMines() {
        return mines;
    }

    public int initGame(int n, int m, int mines){
        this.mines = mines;
        board = new Cell[n][m];
        Random rd = new Random();
        int mi = 0;
        for (int i = 0; i <n; i++) {
            for (int j = 0; j < m; j++) {
                boolean isMine = false;
                board[i][j] = new Cell(isMine,0);
            }
        }
        for (int i = 0; i < mines; i++) {
            int k =rd.nextInt(n);
            int l = rd.nextInt(m);
            Cell cell = board[k][l];
            mi += cell.isLandMine()?0:1;
            cell.setLandMine(true);
        }
        for (int i = 0; i <n; i++) {
            for (int j = 0; j < m; j++) {
                boolean isMine = board[i][j].isLandMine();
                if(!isMine){
                    int minesAround = getMinesAround(i,j);
                    board[i][j].setValue(minesAround);
                }
            }
        }
        return mi;
    }

    public void showAll(boolean show){
        for (int i = 0; i <board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                board[i][j].setShowAll(show);
            }
        }
    }

    private int getMinesAround(int i, int j) {
        int mines = 0;
        mines += i > 0 && board[i-1][j].isLandMine()?1:0;
        mines += i < board.length-1 && board[i+1][j].isLandMine()?1:0;
        mines += j > 0 && board[i][j-1].isLandMine()?1:0;
        mines += j < board[0].length-1 && board[i][j+1].isLandMine()?1:0;
        mines += i > 0 && j > 0 && board[i-1][j-1].isLandMine()?1:0;
        mines += i > 0 && j < board[0].length-1 && board[i-1][j+1].isLandMine()?1:0;
        mines += i < board.length-1 && j > 0 && board[i+1][j-1].isLandMine()?1:0;
        mines += i < board.length-1 && j < board[0].length-1 && board[i+1][j+1].isLandMine()?1:0;
        return mines;
    }

    public void printBoard(){
        System.out.println();
        System.out.print("   ");
        for (int i = 0; i < board[0].length; i++) {
            System.out.print(" " + i);
        }
        System.out.println();
        for (int i = 0; i <board.length; i++) {
            System.out.print(i+" [");
            for (int j = 0; j < board[0].length; j++) {
                System.out.print(" "+board[i][j]);
            }
            System.out.println(" ]");
        }
    }
    public boolean selectCell(int i, int j){
        if(i<0 || i>= board.length || j<0 || j >= board[0].length ){
            throw new RuntimeException("Cell no valid");
        }
        Cell cell = board[i][j];
        if(cell.isLandMine()){
            showAll(true);
            throw new RuntimeException("Game over");
        }else {
            if (cell.isHide()) {
                showCells(i,j,true);
            }
            return validWin();
        }
    }

    private boolean validWin(){
        boolean win = true;
        for (int i = 0; i <board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                win &= !board[i][j].isHide() || board[i][j].isLandMine();
            }
        }
        return win;
    }

    private void showCells(int i, int j, boolean deep) {
        if(i<0 || i>= board.length || j<0 || j >= board[0].length || !board[i][j].isHide()){
            return;
        }
        if(deep && board[i][j].isHide()){
            board[i][j].setHide(false);
            deep = board[i][j].getValue() == 0;
        }

        if (board[i][j].getValue() == 0) {
            showCells(i, j - 1, deep);
            showCells(i, j + 1, deep);
            showCells(i - 1, j, deep);
            showCells(i + 1, j, deep);
            showCells(i - 1, j - 1, deep);
            showCells(i - 1, j + 1, deep);
            showCells(i + 1, j - 1, deep);
            showCells(i + 1, j + 1, deep);
        }
    }

    public Cell[][] getBoard() {
        return board;
    }

    public void markCell(int i, int j) {
        if(i<0 || i>= board.length || j<0 || j >= board[0].length ){
            throw new RuntimeException("Cell no valid");
        }
        Cell cell = board[i][j];
        cell.setMarked(!cell.isMarked());
    }
}
