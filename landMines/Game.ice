module Game{

    struct CellDTO{
        bool isLandMine;
        int value;

        bool hide;

        bool showAll;

        bool isMarked;
    }

    sequence<CellDTO> PixelArray;
    sequence<PixelArray> PixelMatrix;

    interface GameServices{
        bool selectCell(int i, int j);
        PixelMatrix getBoard();
    }
}