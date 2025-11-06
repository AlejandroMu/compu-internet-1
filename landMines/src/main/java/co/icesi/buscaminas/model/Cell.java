package co.icesi.buscaminas.model;

import java.io.Serializable;

public class Cell implements Serializable{

    private boolean isLandMine;
    private int value;

    private boolean hide;

    private boolean showAll;

    private boolean isMarked;

    public Cell(boolean isMine, int value) {
        this.isLandMine = isMine;
        this.value = value;
        hide = true;
        showAll = false;
        isMarked = false;
    }

    public boolean isMarked() {
        return isMarked;
    }

    public void setMarked(boolean marked) {
        isMarked = marked;
    }

    public int getValue() {
        return value;
    }

    public void setLandMine(boolean landMine) {
        isLandMine = landMine;
    }

    public boolean isLandMine() {
        return isLandMine;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public boolean isHide() {
        return hide;
    }

    public void setHide(boolean hide) {
        this.hide = hide;
    }

    public void setShowAll(boolean showAll) {
        this.showAll = showAll;
    }

    public boolean isShowAll() {
        return showAll;
    }

    @Override
    public String toString() {
        if (isMarked) {
            return "\u001B[33mM\u001B[0m";
        }
        return hide && !showAll?".":(isLandMine ?"\u001B[31m*\u001B[0m":value+"");
    }
}
