package co.icesi.buscaminas.services;
import com.zeroc.Ice.Current;

import co.icesi.buscaminas.model.BoardGame;
import co.icesi.buscaminas.model.Cell;
public class ServicesImpl{
    private  BoardGame game;

    public ServicesImpl(){
        game = new BoardGame();
        game.initGame(8, 8, 10);
    }

    public BoardGame getGame() {
        return game;
    }
    public int initGame(int n, int m, int mines, Current current) {
        return game.initGame(n, m, mines);
    }
    
    public boolean selectCell(int i, int j, Current current) {
        
        return game.selectCell(i, j);
    }

    public void showAll(boolean show, Current current) {
        
        game.showAll(show);
    }

    public Cell[][] printBoard(Current current) {
        game.printBoard();
        Cell [][] cells = game.getBoard();

        return cells;
    }
    
}
