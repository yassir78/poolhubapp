package poolhub.service.Utils;

public class JpqlUtils {

    public static String init(Class<?> clazz) {
        return "SELECT item From " + clazz.getSimpleName() + " item where 1=1 ";
    }

    public static String addCriteria(String key, Object valueMin, Object valueMax) {
        String query = addCriteria(key, valueMin, ">=");
        query += addCriteria(key, valueMax, "<=");
        return query;
    }

    public static String addCriteria(String key, Object value, String operator) {
        if (value != null && !value.toString().isEmpty()) {
            if (value instanceof String && operator.equals("LIKE")) {
                return " AND item." + key + " " + operator + " '%" + value + "%'";
            }
            return " AND item." + key + " " + operator + " " + value;
        }
        return "";
    }
}
